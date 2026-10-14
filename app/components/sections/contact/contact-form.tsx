"use client";

import { useForm } from "@mantine/form";
import { useId, useState, type ReactNode } from "react";

import { submitContactForm } from "@/app/lib/api";
import {
  emptyContactForm,
  validateContactForm,
  type ContactFormValues,
} from "@/app/lib/contact";
import { cx } from "@/app/lib/cx";
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

const FIELDS = Object.keys(emptyContactForm) as (keyof ContactFormValues)[];

/**
 * Contact form, posting to /api/contact (see app/api/contact/route.ts for the
 * delivery TODO). Two looks: "panel" (the desktop contact section) and "page"
 * (the phone contact page, with its shorter labels and 48px inputs).
 */
export function ContactForm({ variant = "panel" }: { variant?: "panel" | "page" }) {
  const idPrefix = useId();
  const fieldId = (field: keyof ContactFormValues) => `${idPrefix}-${field}`;
  const isPage = variant === "page";

  const [status, setStatus] = useState<Status>("idle");
  const form = useForm<ContactFormValues>({
    mode: "controlled",
    initialValues: emptyContactForm,
    validate: validateContactForm,
    validateInputOnBlur: true,
  });

  const focusFirstError = (errors: Record<string, unknown>) => {
    const first = FIELDS.find((field) => errors[field]);
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

  const field = (name: keyof ContactFormValues, label: ReactNode, control: ReactNode) => (
    <Field id={fieldId(name)} label={label} error={form.errors[name]}>
      {control}
    </Field>
  );

  const nameField = field(
    "name",
    "Name *",
    <input type="text" autoComplete="name" placeholder="Your name" className={styles.input} {...inputProps("name")} />,
  );
  const phoneField = field(
    "phone",
    isPage ? (
      <span>
        Phone * <span className={styles.hint}>· WhatsApp preferred</span>
      </span>
    ) : (
      <>
        Phone number * <span className={styles.hint}>WhatsApp preferred</span>
      </>
    ),
    <input
      type="tel"
      autoComplete="tel"
      placeholder="+94 7X XXX XXXX"
      className={styles.input}
      {...inputProps("phone")}
    />,
  );

  const submitting = status === "submitting";
  const statusMessage = STATUS_MESSAGES[status];

  return (
    <form className={styles.form} data-variant={variant} noValidate aria-busy={submitting} onSubmit={handleSubmit}>
      {isPage ? (
        <>
          {nameField}
          {phoneField}
        </>
      ) : (
        <div className={styles.row}>
          {nameField}
          {phoneField}
        </div>
      )}

      {field(
        "email",
        "Email",
        <input
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          className={styles.input}
          {...inputProps("email")}
        />,
      )}

      {field(
        "message",
        isPage ? "Message *" : "Your message *",
        <textarea
          rows={isPage ? 4 : 5}
          placeholder={isPage ? "Your idea, product or challenge" : "Tell us about your idea, product or challenge"}
          className={styles.textarea}
          {...inputProps("message")}
        />,
      )}

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
          {!isPage && (
            <a href={siteConfig.contact.whatsappHref} {...buttonProps("ghost", "md", cx(styles.action))}>
              <Icon name="chat" size={18} />
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: ReactNode;
  error: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
