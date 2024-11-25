import { useState } from "react"

export const useFormValidation = (initialValues: Record<string, string>) => {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (
    rules: Record<string, (value: string) => string | null>,
  ) => {
    const newErrors: Record<string, string> = {}
    for (const field in rules) {
      const error = rules[field](form[field])
      if (error) newErrors[field] = error
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }))
  }

  return { form, errors, setErrors, setForm, handleChange, validate }
}
