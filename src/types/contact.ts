export interface ContactFormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFieldKey = keyof ContactFormFields;

export type ContactFieldErrors = Partial<Record<ContactFieldKey, string>>;

export interface ContactApiSuccess {
  ok: true;
  message: string;
}

export interface ContactApiError {
  ok: false;
  message: string;
  errors?: ContactFieldErrors;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;
