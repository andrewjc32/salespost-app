"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import { ActionResult } from "@/types";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { requestResetPassword } from "@/actions/authActions";
import AlertMessage from "@/app/(auth)/verify-email/AlertMessage";

const ForgotPasswordForm = () => {
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data: FieldValues) => {
    setResult(await requestResetPassword(data.email));
    reset();
  };

  return (
    <Card className="max-w-sm w-2/5 mx-auto">
      <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Forgot your password?
      </h1>
      <p className="font-light text-gray-500 dark:text-gray-400">
        Don&apos;t fret! Just type in your email and we will send you a code to reset
        your password!
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
      >
        <AlertMessage result={result} />
        <div>
          <Label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </Label>
          <TextInput
            type="email"
            id="email"
            placeholder="name@company.com"
            {...register("email", { required: true })}
          />
        </div>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          className="w-full mb-4"
          type="submit"
        >
          Send email
        </Button>
      </form>
    </Card>
  );
};

export default ForgotPasswordForm;
