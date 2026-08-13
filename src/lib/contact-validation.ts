import {
  ContactFieldErrors,
  ContactFieldKey,
  ContactFormFields,
} from "../types/contact";

export const CONTACT_LIMITS = {
  name: { min: 1, max: 100 },
  email: { max: 254 },
  subject: { min: 1, max: 200 },
  message: { min: 1, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").trim();
}

export function validateContactForm(
  raw: Partial<Record<ContactFieldKey, unknown>>
): { valid: true; data: ContactFormFields } | { valid: false; errors: ContactFieldErrors } {
  const errors: ContactFieldErrors = {};

  const name = sanitize(raw.name);
  const email = sanitize(raw.email);
  const subject = sanitize(raw.subject);
  const message = sanitize(raw.message);

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name must be ${CONTACT_LIMITS.name.max} characters or fewer.`;
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (email.length > CONTACT_LIMITS.email.max) {
    errors.email = `Email must be ${CONTACT_LIMITS.email.max} characters or fewer.`;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!subject) {
    errors.subject = "Subject is required.";
  } else if (subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = `Subject must be ${CONTACT_LIMITS.subject.max} characters or fewer.`;
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message must be ${CONTACT_LIMITS.message.max} characters or fewer.`;
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: { name, email, subject, message },
  };
}
