"use client";

import { useForm } from "@mantine/form";
import { useState, type ReactNode } from "react";

import { submitContactForm } from "@/app/lib/api";
import {
  emptyContactForm,
  validateContactForm,
  type ContactFormValues,
} from "@/app/lib/contact";
import { siteConfig } from "@/app/lib/site-config";

import { Icon } from "../../ui/icons";
import { buttonProps } from "../../ui/primitives";
import styles from "./contact-form.module.css";

type Status = "idle" | "submitting" | "success" | "error" | "invalid";

const STATUS_MESSAGES: Partial<Record<Status, string>> = {
  success: "Thanks — your message has been sent. We'll get back to you soon.",
  error:
    "Sorry, your message couldn't be sent. Please try again, or chat with us on WhatsApp.",
  invalid: "Please check the highlighted fields.",
};

const fieldId = (field: keyof ContactFormValues) => `contact-${field}`;

/** Posts to /api/contact (see app/api/contact/route.ts for the delivery TODO). */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const form = useForm<ContactFormValues>({
    mode: "controlled",
    initialValues: emptyContactForm,
    validate: validateContactForm,
    validateInputOnBlur: true,
  });

  const focusFirstError = (errors: Record<string, unknown>) => {
    const first = (Object.keys(emptyContactForm) as (keyof ContactFormValues)[]).find(
      (field) => errors[field],
    );
    if (first) document.getElementById(fieldId(first))?.focus();
  };

  const handleSubmit = form.onSubmit(
    async (values) => {
      setStatus("submitting");
      const result = await submitContactForm(values);
      if (result.ok) {
        form.reset();
        setStatus("success");
        return;
      }
      if (result.fieldErrors && Object.keys(result.fieldErrors).length > 0) {
        form.setErrors(result.fieldErrors);
        focusFirstError(result.fieldErrors);
        setStatus("invalid");
        return;
      }
      setStatus("error");
    },
    (errors) => {
      setStatus("idle");
      focusFirstError(errors);
    },
  );

  const inputProps = (field: keyof ContactFormValues) => {
    const error = form.errors[field];
    return {
      id: fieldId(field),
      name: field,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${fieldId(field)}-error` : undefined,
      ...form.getInputProps(field, { withError: false }),
    };
  };

  const submitting = status === "submitting";
  const statusMessage = STATUS_MESSAGES[status];

  return (
    <form className={styles.form} noValidate aria-busy={submitting} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <Field field="name" label="Name *" error={form.errors.name}>
          <input
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className={styles.input}
            {...inputProps("name")}
          />
        </Field>
        <Field
          field="phone"
          label={
            <>
              Phone number * <span className={styles.hint}>WhatsApp preferred</span>
            </>
          }
          error={form.errors.phone}
        >
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+94 7X XXX XXXX"
            className={styles.input}
            {...inputProps("phone")}
          />
        </Field>
      </div>

      <Field field="email" label="Email" error={form.errors.email}>
        <input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={styles.input}
          {...inputProps("email")}
        />
      </Field>

      <Field field="message" label="Your message *" error={form.errors.message}>
        <textarea
          rows={5}
          placeholder="Tell us about your idea, product or challenge"
          className={styles.textarea}
          {...inputProps("message")}
        />
      </Field>

      <div className={styles.footer}>
        <div
          role="status"
          aria-live="polite"
          className={styles.status}
          data-status={statusMessage ? status : undefined}
        >
          {statusMessage}
        </div>

        <div className={styles.actions}>
          <button type="submit" disabled={submitting} {...buttonProps("primary", "md", styles.action)}>
            {submitting ? "Sending…" : "Send message"}
            {submitting ? (
              <span aria-hidden="true" className={styles.spinner} />
            ) : (
              <Icon name="arrowRight" size={18} strokeWidth={2} />
            )}
          </button>
          <a href={siteConfig.contact.whatsappHref} {...buttonProps("ghost", "md", styles.action)}>
            <Icon name="chat" size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </form>
  );
}

function Field({
  field,
  label,
  error,
  children,
}: {
  field: keyof ContactFormValues;
  label: ReactNode;
  error: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={fieldId(field)} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${fieldId(field)}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
