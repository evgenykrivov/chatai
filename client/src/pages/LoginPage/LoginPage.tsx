import React, { useState } from "react"
import AuthForm from "@/components/AuthForm/AuthForm"
import { useAuth } from "@/hooks/useAuth"

const LoginPage: React.FC = () => {
  const { login, loginState } = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  )
  const [hasSubmitted, setHasSubmitted] = useState(false) // Флаг попытки отправки

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}
    if (!formData.email) {
      newErrors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be valid."
    }
    if (!formData.password) {
      newErrors.password = "Password is required."
    } else if (formData.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters."
    }
    return newErrors
  }

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      // Убираем ошибки при вводе
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setHasSubmitted(true) // Устанавливаем флаг попытки отправки
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    try {
      await login(formData)
    } catch (err: any) {
      setErrors({ email: "Invalid email or password." })
    }
  }

  return (
    <AuthForm
      title="Login"
      fields={[
        {
          id: "email",
          type: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: handleInputChange("email"),
          error: hasSubmitted ? errors.email : undefined, // Ошибка только после попытки отправки
        },
        {
          id: "password",
          type: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleInputChange("password"),
          error: hasSubmitted ? errors.password : undefined, // Ошибка только после попытки отправки
        },
      ]}
      submitButtonLabel="Login"
      footerText="Don't have an account?"
      footerLink={{ text: "Register here", to: "/register" }}
      onSubmit={handleSubmit}
      isLoading={loginState.isLoading}
    />
  )
}

export default LoginPage
