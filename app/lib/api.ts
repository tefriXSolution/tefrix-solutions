import type { ContactFormErrors, ContactFormValues } from "./contact";

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; fieldErrors?: ContactFormErrors };

/** Posts the contact form to the /api/contact route handler. */
export async function submitContactForm(
  values: ContactFormValues,
): Promise<SubmitContactResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) return { ok: true };

    const body = (await response.json().catch(() => null)) as {
      fieldErrors?: ContactFormErrors;
    } | null;
    return { ok: false, fieldErrors: body?.fieldErrors };
  } catch {
    return { ok: false };
  }
}
