"use client";

import { Button, Card, Label, TextInput } from "flowbite-react";
import { ActionResult } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/actions/authActions";
import AlertMessage from "@/app/(auth)/verify-email/AlertMessage";
import { ResetPasswordSchema, resetPasswordSchema } from "@/lib/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
  const [result, setResult] = useState<ActionResult<string> | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ResetPasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    setResult(await resetPassword(data.password, searchParams.get("token")));
    reset();
  };

  return (
    <Card className="max-w-sm w-2/5 mx-auto">
      <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Reset password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
      >
        <AlertMessage result={result} />
        <div>
          <Label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your new password
          </Label>
          <TextInput
            type="password"
            id="password"
            placeholder="••••••••"
            {...register("password")}
            helperText={errors.password?.message}
            color={errors.password ? "failure" : "default"}
          />
        </div>
        <div>
          <Label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </Label>
          <TextInput
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register("confirmPassword")}
            helperText={errors.confirmPassword?.message}
            color={errors.confirmPassword ? "failure" : "default"}
          />
        </div>
        <Button
          isProcessing={isSubmitting}
          disabled={!isValid}
          className="w-full mb-4"
          type="submit"
        >
          Reset password
        </Button>
      </form>
    </Card>
  );
}

export default ResetPasswordForm