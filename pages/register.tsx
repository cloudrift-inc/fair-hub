import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import "../app/globals.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import Image from "next/image";
import Button from "../components/foundational/Button";
import Link from "../components/foundational/Link";
import { useRouter } from 'next/router';
import {FAIR_API_VERSION, getFairProviderPubApiKey, getFairApiUrl} from "@/lib/faircompute";
import { PageTitle } from '../components/PageTitle';


interface FormData {
  username: string;
  email: string;
  password: string;
}

interface SignupResponse {
  success: boolean;
  message: string;
}

const signup = async (formData: FormData): Promise<SignupResponse> => {
  const apiUrl = getFairApiUrl();

  const response = await fetch(`${apiUrl}/api/v1/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": getFairProviderPubApiKey(),
    },
    body: JSON.stringify({
      version: FAIR_API_VERSION,
      data: {
        name: formData.username,
        email: formData.email,
        password: formData.password,
        invite_code: null,
      },
    }),
  });


  if (response.status === 200) {
    return { success: true, message: "Registration successful!" };
  } else if (response.status === 409) {
    const responseText = await response.text();
    throw new Error("User with email already exists.");
  } else {
    const responseText = await response.text();
    throw new Error(responseText || "Failed to register. Please try again.");
  }
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();
  const mutation = useMutation<SignupResponse, Error, FormData>({
    mutationFn: signup,
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      setErrorMessage(null);
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    },
  });

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    setErrorMessage(null); // Clear previous error messages
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
            <h2 className="text-2xl font-bold">Create an account</h2>
            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link href="/login">
                <span className="cursor-pointer text-blue-500">Log in</span>
              </Link>
            </p>
          </div>
          {successMessage && (
            <p className="text-green-600">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
            <input
              type="email"
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="w-full rounded-md border border-gray-500 p-3 placeholder-gray-500"
              />
              <Button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
            <p className="font-roboto mt-1 text-xs text-gray-500">
              Use 8 or more characters with a mix of letters, numbers & symbols
            </p>
            <Button
              className="font-roboto w-full rounded-full bg-[#0E1B4D] py-5 font-medium text-white"
              type="submit"
            >
              Create an account
            </Button>
          </form>
          <p className="text-center text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms">
              <span className="cursor-pointer text-blue-500">Terms of use</span>
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              <span className="cursor-pointer text-blue-500">
                Privacy Policy
              </span>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
