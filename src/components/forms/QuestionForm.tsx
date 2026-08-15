"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "@base-ui/react";
import { Button } from "../ui/button";

const QuestionForm = () => {
  const form = useForm({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async () => {
    //TODO: Submit Question
  };

  return (
    <form id="question-form" className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor="question-form-title" className="paragraph-semibold text-dark400_light800">
                  Question Title <span className="text-red-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  id="question-form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter title..."
                  autoComplete="off"
                  className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 rounded-md border px-3 py-2"
                />
                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Be specific and imagine you are asking a question to another person.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
              <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
                <FieldLabel htmlFor="question-form-content" className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem<span className="text-red-500">*</span>
                </FieldLabel>
                Editor
                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Introduce the problem and expand on what you have put in the title.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
              <Field data-invalid={fieldState.invalid} className="gap flex w-full flex-col gap-3">
                <FieldLabel htmlFor="question-form-tags" className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-red-500">*</span>
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id="question-form-tags"
                    aria-invalid={fieldState.invalid}
                    placeholder="Add tags"
                    autoComplete="off"
                    className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 w-full rounded-md border px-3 py-2"
                  />
                  Tags
                </div>
                <FieldDescription className="body-regular text-light-500 mt-2.5">
                  Add upto 3 tags to describe what your question is about. You need to press enter to add a tag.
                </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            </>
          )}
        />
      </FieldGroup>
      <div className="mt-16 flex justify-end">
        <Button type="submit" className="primary-gradient !text-light-900 w-fit">
          Ask Question
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
