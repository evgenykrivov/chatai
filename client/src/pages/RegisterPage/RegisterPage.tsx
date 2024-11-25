import React, { useState } from "react"
import AuthForm from "@/components/AuthForm/AuthForm"
import { useRegisterMutation } from "@/entities/user/api/userApi"
import { ERole } from "@/entities/user/api/typesApi"

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})
  const [hasSubmitted, setHasSubmitted] = useState(false) // Флаг попытки отправки
  const [register, registerState] = useRegisterMutation()

  const validate = () => {
    const newErrors: {
      email?: string
      password?: string
      confirmPassword?: string
    } = {}
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
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords must match."
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
      await register({
        email: formData.email,
        password: formData.password,
        role: ERole.USER,
      }).unwrap()
      window.location.href = "/login"
    } catch (err: any) {
      setErrors({ email: "Email is already taken." })
    }
  }

  return (
    <AuthForm
      title="Register"
      fields={[
        {
          id: "email",
          type: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: handleInputChange("email"),
          error: hasSubmitted ? errors.email : undefined,
        },
        {
          id: "password",
          type: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleInputChange("password"),
          error: hasSubmitted ? errors.password : undefined,
        },
        {
          id: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          value: formData.confirmPassword,
          onChange: handleInputChange("confirmPassword"),
          error: hasSubmitted ? errors.confirmPassword : undefined,
        },
      ]}
      submitButtonLabel="Register"
      footerText="Already have an account?"
      footerLink={{ text: "Login here", to: "/login" }}
      onSubmit={handleSubmit}
      isLoading={registerState.isLoading}
    />
  )
}

export default RegisterPage
