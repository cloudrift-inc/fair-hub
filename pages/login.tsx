import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../app/globals.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Image from "next/image";
import Button from "../components/foundational/Button";
import Link from "../components/foundational/Link";
import { useRouter } from 'next/router'
import { apiRequest } from "@/lib/faircompute";
import { PageTitle } from '../components/PageTitle';



interface FormData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export const login = async (formData: FormData): Promise<LoginResponse> => {
  const requestData = {
      email: formData.email,
      password: formData.password,
  };

  const response = await apiRequest<{ data: LoginResponse }>("/api/v1/auth/login", false,  requestData);

  return response.data;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter()
  const mutation = useMutation<LoginResponse, Error, FormData>({
    mutationFn: login,
    onSuccess: (data) => {
      const token = data.token;
      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", token); // or sessionStorage.setItem("token", token);
      // Update user context with logged-in user data if needed
      router.push('/console')
    },
    onError: (error) => {
      setError(error.message);
      console.error("Error logging in:", error);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    mutation.mutate(formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col bg-linear-gradient md:flex-row">
      <PageTitle />
      <div className="flex flex-1 flex-col items-center justify-center md:items-center md:justify-center">
        <Image
          src="/logo1.png"
          alt="Logo"
          width={150} // Smaller size for mobile
          height={150} // Smaller size for mobile
          className="md:h-[250px] md:w-[250px]" // Larger size for desktop
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center px-4 py-8 md:w-2/5 md:items-start md:px-12">
        <div className="w-full max-w-md space-y-6 p-8">
          <div className="text-center">
            <h2 className="font text-2xl font-bold">Welcome back!</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <div className="relative">
              <input
                className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
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
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <Button
              className="font-roboto w-full rounded-full bg-[#0E1B4D] py-3 font-medium text-white"
              type="submit"
            >
              Log in
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <p className="font-roboto text-sm text-gray-500">
              <Link href="#" className="underline">
                Forgot your password?
              </Link>
            </p>
            <p className="font-roboto text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-gray-500 underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
