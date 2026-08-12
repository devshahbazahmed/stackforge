"use client";

import * as React from "react";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Controller, DefaultValues, FieldValues, Path, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import ROUTES from "../../constants/routes";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: standardSchemaResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async () => {
    //TODO: Authenticate User
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <form id="form-rhf-demo" onSubmit={form.handleSubmit(handleSubmit)} className="mt-10 space-y-6">
      <FieldGroup>
        {Object.keys(defaultValues).map((field) => (
          <Controller
            key={field}
            name={field as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col gap-2.5">
                <FieldLabel htmlFor="form-rhf-demo-title" className="paragraph-medium text-dark400_light700">
                  {field.name === "email" ? "Email address" : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FieldLabel>
                <Input
                  required
                  type={field.name === "password" ? "password" : "text"}
                  {...field}
                  id="form-rhf-demo-title"
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
          form="form-rhf-demo"
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium rounded-2 font-inter !text-light-900 min-h-12 w-full px-4 py-3"
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
