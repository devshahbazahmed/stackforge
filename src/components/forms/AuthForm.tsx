"use client";

import * as React from "react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: StandardSchemaV1<T, T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) {
  const router = useRouter();
  const form = useForm<T>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;

    if (result?.success) {
      toast.success("Success", {
        description: formType === "SIGN_IN" ? "Signed in successfully" : "Signed up successfully",
      });

      router.push(ROUTES.HOME);
    } else {
      toast.error(`Error: ${result.error}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form id="auth-form" onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      <FieldGroup>
        {Object.keys(defaultValues).map((field) => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor="auth-form-title" className="paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email address" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  required
                  type={field.name === "password" ? "password" : "text"}
                  {...field}
                  id="auth-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder={`Enter ${field.name}`}
                  autoComplete="off"
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus rounded-1.5 min-h-12 border"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        ))}
      </FieldGroup>
      <Field orientation="horizontal">
        <Button
          form="auth-form"
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full cursor-pointer px-4 py-3"
        >
          {form.formState.isSubmitting ? (buttonText === "Sign In" ? "Signing In..." : "Signing up...") : buttonText}
        </Button>
      </Field>
      {formType === "SIGN_IN" ? (
        <p>
          Dont&apos;t have an account?{" "}
          <Link href={ROUTES.SIGN_UP} className="paragraph-semibold primary-text-gradient">
            Sign Up
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <Link href={ROUTES.SIGN_IN} className="paragraph-semibold primary-text-gradient">
            Sign In
          </Link>
        </p>
      )}
    </form>
  );
}
