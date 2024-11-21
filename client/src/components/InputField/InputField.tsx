import React from "react"
import styles from "./InputField.module.scss"

type InputFieldProps = {
  id: string
  type: string
  placeholder: string
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
}) => (
  <div className={styles.inputGroup}>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${error ? styles.inputError : ""}`}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

export default InputField
