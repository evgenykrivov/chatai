import React from "react"
import InputField from "@/components/InputField/InputField"
import styles from "./AuthForm.module.scss"
import { Link } from "react-router-dom"

type Field = {
  id: string
  type: string
  placeholder: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
          <Link className={styles.footerLink} to={footerLink.to}>
            {footerLink.text}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
