import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "../app/globals.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Image from "next/image";
import Button from "../components/foundational/Button";
import Link from "../components/foundational/Link";

interface EmailFormData {
  email: string;
}

interface ResetFormData {
  token: string;
  newPassword: string;
}

export default function ForgotPasswordForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [step, setStep] = useState<"email" | "reset">("email");
  
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm<ResetFormData>();

  const onSubmitEmail: SubmitHandler<EmailFormData> = (data) => {
    console.log("Email submitted:", data.email);
    setStep("reset");
  };

  const onSubmitReset: SubmitHandler<ResetFormData> = (data) => {
    console.log("Reset submitted:", data);
    // Here you would typically handle the password reset logic
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col bg-linear-gradient md:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center md:items-center md:justify-center">
        <Image
          src="/logo1.png"
          alt="Logo"
          width={150}
          height={150}
          className="md:h-[250px] md:w-[250px]"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 md:w-2/5 md:items-start md:px-12">
        <div className="w-full max-w-md space-y-6 p-8">
          <div className="text-center">
            <h2 className="font text-2xl font-bold">Reset Your Password</h2>
            {step === "email" && (
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            )}
          </div>

          {step === "email" ? (
            <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="space-y-4">
              <input
                className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
                type="email"
                placeholder="Email address"
                {...registerEmail("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {emailErrors.email && (
                <p className="text-red-500">{emailErrors.email.message}</p>
              )}
              <Button
                className="font-roboto w-full rounded-full bg-[#0E1B4D] py-3 text-white"
                type="submit"
              >
                Send Reset Instructions
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSubmitReset(onSubmitReset)} className="space-y-4">
              <p className="text-center text-sm text-gray-600 mb-4">
                Enter the reset code from your email and choose a new password.
              </p>
              <input
                className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
                type="text"
                placeholder="Enter reset code"
                {...registerReset("token", {
                  required: "Reset code is required",
                })}
              />
              {resetErrors.token && (
                <p className="text-red-500">{resetErrors.token.message}</p>
              )}
              <div className="relative">
                <input
                  className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  {...registerReset("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-600"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
              {resetErrors.newPassword && (
                <p className="text-red-500">{resetErrors.newPassword.message}</p>
              )}
            <p className="font-roboto mt-1 text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
              <Button
                className="font-roboto w-full rounded-full bg-[#0E1B4D] py-3 font-medium text-white"
                type="submit"
              >
                Create New Password
              </Button>
            </form>
          )}
          <p className="font-roboto text-sm text-gray-500 text-center">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}