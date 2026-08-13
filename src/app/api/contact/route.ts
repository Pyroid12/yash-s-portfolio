import { NextResponse } from "next/server";
import { validateContactForm } from "../../../lib/contact-validation";
import { checkRateLimit, getClientIp } from "../../../lib/rate-limit";
import {
  isTurnstileConfigured,
  isTurnstileRequired,
  verifyTurnstileToken,
} from "../../../lib/turnstile";
import { isResendConfigured, sendContactEmail } from "../../../lib/email";
import type { ContactApiResponse } from "../../../types/contact";

const MAX_BODY_BYTES = 12_000;

export async function POST(request: Request) {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return NextResponse.json<ContactApiResponse>(
      { ok: false, message: "Request too large." },
      { status: 413 }
    );
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message:
          "Too many messages sent recently. Please wait a while and try again, or email me directly.",
      },
      {
        status: 429,
        headers: rate.retryAfterSeconds
          ? { "Retry-After": String(rate.retryAfterSeconds) }
          : undefined,
      }
    );
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json<ContactApiResponse>(
        { ok: false, message: "Request too large." },
        { status: 413 }
      );
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json<ContactApiResponse>(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json<ContactApiResponse>(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }

  const payload = body as Record<string, unknown>;
  const validation = validateContactForm({
    name: payload.name,
    email: payload.email,
    subject: payload.subject,
    message: payload.message,
  });

  if (!validation.valid) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message: "Please fix the errors below and try again.",
        errors: validation.errors,
      },
      { status: 400 }
    );
  }

  const turnstileToken =
    typeof payload.turnstileToken === "string" ? payload.turnstileToken : "";

  if (isTurnstileRequired()) {
    if (!isTurnstileConfigured()) {
      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          message:
            "Something went wrong. Please try again or contact me directly by email.",
        },
        { status: 503 }
      );
    }
    if (!turnstileToken) {
      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          message: "Please complete the security check and try again.",
        },
        { status: 400 }
      );
    }
    const verified = await verifyTurnstileToken(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          message: "Security verification failed. Please try again.",
        },
        { status: 403 }
      );
    }
  } else if (isTurnstileConfigured() && turnstileToken) {
    const verified = await verifyTurnstileToken(turnstileToken, ip);
    if (!verified) {
      return NextResponse.json<ContactApiResponse>(
        {
          ok: false,
          message: "Security verification failed. Please try again.",
        },
        { status: 403 }
      );
    }
  }

  if (!isResendConfigured()) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message:
          process.env.NODE_ENV === "development"
            ? "Email service is not configured. Add RESEND_API_KEY and CONTACT_FROM_EMAIL to .env.local."
            : "Something went wrong. Please try again or contact me directly by email.",
      },
      { status: 503 }
    );
  }

  const sent = await sendContactEmail(validation.data);
  if (!sent.ok) {
    return NextResponse.json<ContactApiResponse>(
      {
        ok: false,
        message:
          "Something went wrong. Please try again or contact me directly by email.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json<ContactApiResponse>({
    ok: true,
    message: "Message sent successfully. Thanks for reaching out!",
  });
}
