// Contact form shape and validation, shared by the client form and the
// /api/contact route handler so both enforce the same rules.

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const emptyContactForm: ContactFormValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const MAX_LENGTH: Record<keyof ContactFormValues, number> = {
  name: 120,
  phone: 32,
  email: 254,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX_LENGTH.name) errors.name = "Please use a shorter name.";

  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) errors.phone = "Please enter a phone number.";
  else if (
    !PHONE_PATTERN.test(phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15 ||
    phone.length > MAX_LENGTH.phone
  )
    errors.phone = "Please enter a valid phone number, e.g. +94 76 590 7934.";

  if (email && (!EMAIL_PATTERN.test(email) || email.length > MAX_LENGTH.email))
    errors.email = "Please enter a valid email address.";

  if (!message) errors.message = "Please tell us a little about your project.";
  else if (message.length > MAX_LENGTH.message)
    errors.message = `Please keep your message under ${MAX_LENGTH.message} characters.`;

  return errors;
}

/** Coerces an unknown JSON payload into form values (missing fields become ""). */
export function parseContactPayload(payload: unknown): ContactFormValues {
  const source = (typeof payload === "object" && payload !== null ? payload : {}) as Record<
    string,
    unknown
  >;
  const field = (key: keyof ContactFormValues) =>
    typeof source[key] === "string" ? (source[key] as string).trim() : "";

  return {
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    message: field("message"),
  };
}
