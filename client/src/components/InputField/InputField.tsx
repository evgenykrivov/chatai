import React from "react"
import styles from "./InputField.module.scss"

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

const InputField: React.FC<Field> = (props) => {
  if (props.type === "select") {
    return (
      <div className={styles.inputGroup}>
        <select
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          className={`${styles.input} ${props.error ? styles.inputError : ""}`}
        >
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {props.error && (
          <span className={styles.errorMessage}>{props.error}</span>
        )}
      </div>
    )
  }

  return (
    <div className={styles.inputGroup}>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={`${styles.input} ${props.error ? styles.inputError : ""}`}
      />
      {props.error && (
        <span className={styles.errorMessage}>{props.error}</span>
      )}
    </div>
  )
}

export default InputField
