import React, { useState } from "react"
import AuthForm from "@/components/AuthForm/AuthForm"
import { ERoute } from "@/routes/constants"
import { useRegisterMutation } from "@/entities/user/api/userApi"
import { useNavigate } from "react-router-dom"
import { ERole } from "@/entities/user/api/typesApi"

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: ERole.USER,
  })
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!form.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format"
    if (!form.password.trim()) newErrors.password = "Password is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await register(form).unwrap()
        navigate(ERoute.ChatListPage)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <AuthForm
      title="Create Your Account"
      subtitle="Creating a new account"
      fields={[
        {
          id: "email",
          type: "email",
          placeholder: "Email",
          value: form.email,
          error: errors.email,
          onChange: handleChange,
        },
        {
          id: "password",
          type: "password",
          placeholder: "Password",
          value: form.password,
          error: errors.password,
          onChange: handleChange,
        },
      ]}
      submitButtonLabel="Register"
      footerText="Already have an account?"
      footerLink={{ text: "Log in", to: ERoute.LoginPage }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export default RegisterPage
