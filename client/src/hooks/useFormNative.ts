import { useState } from "react"

export const useFormNative = <T extends object>(initialState: T) => {
  const [form, setForm] = useState<T>(initialState)

  const onChange = (fieldName: keyof T, value: string) => {
    setForm({
      ...form,
      [fieldName]: value,
    })
  }

  return {
    form,
    onChange,
  }
}
