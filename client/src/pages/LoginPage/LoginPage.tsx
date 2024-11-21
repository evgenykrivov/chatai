import React, { useState } from "react"
import AuthForm from "@/components/AuthForm/AuthForm"
import { ERoute } from "@/routes/constants"
import { useLoginMutation } from "@/entities/user/api/userApi"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({ email: "", password: "" })
  const [login, { isLoading }] = useLoginMutation()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        await login(form).unwrap()
        navigate(ERoute.ChatListPage)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <AuthForm
      title="Welcome Back"
      subtitle="Log in to your account"
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
      submitButtonLabel="Login"
      footerText="Don't have an account?"
      footerLink={{ text: "Register", to: ERoute.RegisterPage }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  )
}

export default LoginPage
