"use client";

import { Button, Card, Alert, Label, TextInput } from "flowbite-react";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signInUser } from "@/actions/authActions";
import SocialLogin from "./SocialLogin";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginSchema) => {
    const result = await signInUser(data);

    // if (result.status === "success") {
    //   router.push("/");
    // } else {
    //   console.log(result.error);
    // }
    if (result.status == "error") {
      if (Array.isArray(result.error)) {
        result.error.forEach((error) => {
          if (error.path) {
            setServerError(`${error.path.join(".")} ${error.message}`);
          } else {
            setServerError(error.message);
          }
        });
      } else {
        setServerError(result.error as string);
      }
    } else {
      router.push("/");
    }
  };

  return (
    <Card className="max-w-sm md:w-2/5 xs:w-4/5 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
        <SocialLogin />
        <div className="flex items-center justify-between mb-4">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="mb-4">
          <Label htmlFor="email" className="block mb-2">
            Email
          </Label>
          <TextInput
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@example.com"
            required
            helperText={errors.email?.message}
            color={errors.email ? "failure" : "default"}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password" className="block mb-2">
            Password
          </Label>
          <TextInput
            id="password"
            type="password"
            {...register("password")}
            placeholder="••••••••"
            required
            helperText={errors.password?.message}
            color={errors.password ? "failure" : "default"}
          />
        </div>
        {serverError && <Alert color="failure">{serverError}</Alert>}
        <div className="flex mb-4">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          isProcessing={isSubmitting}
          disabled={!isValid}
          className="w-full mb-4"
        >
          Log in
        </Button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </Card>
  );
};

export default LoginForm;