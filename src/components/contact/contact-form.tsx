"use client";

import React, { useCallback, useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { validateContactForm, CONTACT_LIMITS } from "../../lib/contact-validation";
import type {
  ContactApiResponse,
  ContactFieldErrors,
  ContactFieldKey,
  ContactFormFields,
} from "../../types/contact";
import { cn } from "../../lib/utils";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const TURNSTILE_ENABLED = Boolean(TURNSTILE_SITE_KEY);
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const EMPTY_FORM: ContactFormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

interface FieldProps {
  id: ContactFieldKey;
  label: string;
  type?: "text" | "email" | "textarea";
  placeholder: string;
  value: string;
  error?: string;
  maxLength: number;
  disabled: boolean;
  onChange: (field: ContactFieldKey, value: string) => void;
}

function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  maxLength,
  disabled,
  onChange,
}: FieldProps) {
  const errorId = `${id}-error`;
  const sharedClass = cn(
    "w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors",
    "focus-visible:outline-2 focus-visible:outline-primary focus-visible:border-primary/40",
    error ? "border-destructive/60" : "border-border",
    disabled && "opacity-60 cursor-not-allowed"
  );

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(id, e.target.value)}
          className={cn(sharedClass, "resize-y min-h-[120px]")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete={id === "email" ? "email" : id === "name" ? "name" : "off"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(e) => onChange(id, e.target.value)}
          className={sharedClass}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [banner, setBanner] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const turnstileRequired = IS_PRODUCTION && TURNSTILE_ENABLED;
  const formDisabled =
    status === "loading" ||
    status === "success" ||
    (IS_PRODUCTION && !TURNSTILE_ENABLED);

  const handleChange = useCallback((field: ContactFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formDisabled) return;

    const validation = validateContactForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      setStatus("error");
      setBanner("Please fix the errors below and try again.");
      return;
    }

    if (turnstileRequired && !turnstileToken) {
      setStatus("error");
      setBanner("Please complete the security check and try again.");
      return;
    }

    setStatus("loading");
    setBanner("");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validation.data,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const data = (await res.json()) as ContactApiResponse;

      if (data.ok) {
        setStatus("success");
        setBanner(data.message);
        setForm(EMPTY_FORM);
        setTurnstileToken("");
        turnstileRef.current?.reset();
        return;
      }

      setStatus("error");
      setBanner(data.message);
      if (data.errors) setErrors(data.errors);
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } catch {
      setStatus("error");
      setBanner(
        "Something went wrong. Please try again or contact me directly by email."
      );
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card shadow-sm p-6 sm:p-8">
      <h2 className="text-lg font-bold text-foreground mb-6">Send a message</h2>

      {!TURNSTILE_ENABLED && (
        <div
          className="mb-5 rounded-xl border border-amber-500/30 bg-amber-500/8 px-4 py-3 text-sm text-foreground/85"
          role="status"
        >
          {IS_PRODUCTION
            ? "The contact form is temporarily unavailable. Please email me directly."
            : "Turnstile is not configured. Add NEXT_PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY to .env.local to enable spam protection."}
        </div>
      )}

      {banner && (
        <div
          role={status === "success" ? "status" : "alert"}
          aria-live="polite"
          className={cn(
            "mb-5 rounded-xl px-4 py-3 text-sm font-medium",
            status === "success"
              ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
              : "border border-destructive/30 bg-destructive/8 text-destructive"
          )}
        >
          {banner}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField
          id="name"
          label="Name"
          placeholder="Your name"
          value={form.name}
          error={errors.name}
          maxLength={CONTACT_LIMITS.name.max}
          disabled={formDisabled}
          onChange={handleChange}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          maxLength={CONTACT_LIMITS.email.max}
          disabled={formDisabled}
          onChange={handleChange}
        />
        <FormField
          id="subject"
          label="Subject"
          placeholder="What is this about?"
          value={form.subject}
          error={errors.subject}
          maxLength={CONTACT_LIMITS.subject.max}
          disabled={formDisabled}
          onChange={handleChange}
        />
        <FormField
          id="message"
          label="Message"
          type="textarea"
          placeholder="Your message..."
          value={form.message}
          error={errors.message}
          maxLength={CONTACT_LIMITS.message.max}
          disabled={formDisabled}
          onChange={handleChange}
        />

        {TURNSTILE_ENABLED && (
          <div className="flex flex-col gap-2">
            <div className="overflow-hidden min-h-[65px]">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => {
                  setTurnstileToken(token);
                  setTurnstileError(false);
                }}
                onExpire={() => setTurnstileToken("")}
                onError={() => {
                  setTurnstileToken("");
                  setTurnstileError(true);
                }}
                options={{ theme: "auto", size: "normal" }}
              />
            </div>
            {turnstileError && (
              <p role="alert" className="text-xs font-medium text-destructive">
                Security check failed to load. Check that your domain is added in
                Cloudflare Turnstile, then refresh the page.
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={formDisabled || (turnstileRequired && !turnstileToken)}
          className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all text-sm shadow-lg shadow-primary/20 focus-visible:outline-2 focus-visible:outline-primary w-full sm:w-auto self-start min-h-[44px]"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
