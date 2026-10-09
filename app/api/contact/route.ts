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
    return Response.json({ error: "delivery_not_configured" }, { status: 503 });
  }

  return Response.json({ ok: true });
}

/**
 * ─── TODO(contact-delivery): send contact submissions somewhere real ───────
 *
 * The project has no submission backend yet. Replace this function's body
 * with the real delivery (e.g. email via Resend/SMTP, a CRM, or a Google
 * Sheet) and return true once the message has been accepted.
 *
 * Until then, submissions are only logged in development. In production this
 * returns false, so the route responds 503 and the form shows its error state
 * (which points people to WhatsApp and email) instead of silently dropping
 * real enquiries.
 */
async function deliverContactSubmission(submission: ContactFormValues): Promise<boolean> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[contact] Submission received (not delivered: no backend configured)", submission);
    return true;
  }
  return false;
}
