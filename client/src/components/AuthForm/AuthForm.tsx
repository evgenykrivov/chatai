import React from "react"
import InputField from "@/components/InputField/InputField"
import styles from "./AuthForm.module.scss"

type Field =
  | {
      id: string
      type: "text" | "password" | "email"
      placeholder: string
      value: string
      error?: string
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    }
  | {
      id: string
      type: "select"
      value: string
      error?: string
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
      options: { value: string; label: string }[]
    }

type AuthFormProps = {
  title: string
  subtitle?: string
  fields: Field[]
  submitButtonLabel: string
  footerText: string
  footerLink: { text: string; to: string }
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading?: boolean
  errorMessage?: string
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  subtitle,
  fields,
  submitButtonLabel,
  footerText,
  footerLink,
  onSubmit,
  isLoading,
  errorMessage,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {fields.map((field) => (
            <InputField key={field.id} {...field} />
          ))}
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : submitButtonLabel}
          </button>
        </form>
        <p className={styles.footerText}>
          {footerText}{" "}
          <a className={styles.footerLink} href={footerLink.to}>
            {footerLink.text}
          </a>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
