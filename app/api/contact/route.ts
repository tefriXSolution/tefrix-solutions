import {
  parseContactPayload,
  validateContactForm,
  type ContactFormValues,
} from "@/app/lib/contact";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const submission = parseContactPayload(payload);
  const fieldErrors = validateContactForm(submission);
  if (Object.keys(fieldErrors).length > 0) {
    return Response.json({ error: "validation_failed", fieldErrors }, { status: 422 });
  }

  const delivered = await deliverContactSubmission(submission);
  if (!delivered) {
    return Response.json({ error: "delivery_failed" }, { status: 503 });
  }

  return Response.json({ ok: true });
}

/**
 * Sends a submission to the Google Sheet's Apps Script web app, which appends
 * a row and emails the enquiry to the team. It returns true only once the
 * script answers `{ ok: true }`.
 *
 * CONTACT_SHEET_URL (the web app's /exec URL) and CONTACT_SHEET_SECRET (must
 * match SECRET in the script) come from .env locally, or from the hosting's
 * environment variables in production.
 *
 * Without them, submissions are only logged in development. In production this
 * returns false, so the route responds 503 and the form shows its error state
 * (which points people to WhatsApp and email) instead of silently dropping
 * real enquiries. Delivery failures take the same path.
 */
async function deliverContactSubmission(submission: ContactFormValues): Promise<boolean> {
  const url = process.env.CONTACT_SHEET_URL;
  const secret = process.env.CONTACT_SHEET_SECRET;

  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Submission received (not delivered: CONTACT_SHEET_URL/SECRET not set)", submission);
      return true;
    }
    console.error("[contact] Not delivered: CONTACT_SHEET_URL/SECRET not set");
    return false;
  }

  try {
    // Apps Script replies with a redirect to the script's output; fetch follows it.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, ...submission }),
      signal: AbortSignal.timeout(15_000),
    });
    const body = (await response.json().catch(() => null)) as { ok?: unknown } | null;
    if (body?.ok === true) return true;
    console.error("[contact] Sheet rejected the submission", response.status, body);
    return false;
  } catch (error) {
    console.error("[contact] Sheet delivery failed", error);
    return false;
  }
}
