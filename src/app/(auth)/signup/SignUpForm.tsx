"use client";

import { Button, Card, Label, TextInput, Alert } from "flowbite-react";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "@/actions/authActions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
  });
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpSchema) => {
    const result = await signUp(data);

    console.log(result);

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
      router.push("/login");
    }
  };

  return (
    <Card className="max-w-sm w-2/5 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {serverError && <Alert color="failure">{serverError}</Alert>}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Name" />
          </div>
          <TextInput
            id="name1"
            type="text"
            {...register("name")}
            required
            helperText={errors.name?.message}
            color={errors.name ? "failure" : "default"}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            {...register("email")}
            required
            helperText={errors.email?.message}
            color={errors.email ? "failure" : "default"}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            {...register("password")}
            required
            helperText={errors.password?.message}
            color={errors.password ? "failure" : "default"}
          />
        </div>
        <Button type="submit" isProcessing={isSubmitting} disabled={!isValid}>
          Create Account
        </Button>
      </form>
    </Card>
  );
};

export default SignUpForm;
