"use client";

import * as React from "react";
import * as z from "zod";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AnswerSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

export default function AnswerForm({ questionId }: { questionId: string }) {
  const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isAnswering, startAnswerTransition] = React.useTransition();
  const [isAISubmitting, setIsAISubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof AnswerSchema>) => {
    startAnswerTransition(async () => {
      const result = await createAnswer({ questionId, content: values.content });

      if (result.success) {
        form.reset();
        toast.success("Answer posted successfully.", {
          description: "Your answer has been posted successfully.",
        });
      } else {
        toast.error("Error", {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">Write your answer here</h4>
        <Button
          className="btn light-border-2 text-primary-500 dark:text-primary-500 gap-1.5 rounded-md border px-4 py-2.5 shadow-none hover:cursor-pointer"
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Image src="/icons/stars.svg" alt="stars" width={12} height={12} className="object-contain" />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <form id="answer-form" onSubmit={form.handleSubmit(handleSubmit)} className="mt-6 flex w-full flex-col gap-10">
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <>
                <Field data-invalid={fieldState.invalid} className="mt-3.5 flex w-full flex-col gap-3">
                  <FieldLabel htmlFor="question-form-content" className="paragraph-semibold text-dark400_light800">
                    Detailed explanation of your problem<span className="text-red-500">*</span>
                  </FieldLabel>
                  <Editor editorRef={editorRef} value={field.value} fieldChange={field.onChange} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
                <div className="flex justify-end">
                  <Button type="submit" className="primary-gradient text-light-700 w-fit hover:cursor-pointer">
                    {isAnswering ? (
                      <>
                        <ReloadIcon className="mr-2 size-4 animate-spin" />
                        Posting...
                      </>
                    ) : (
                      "Post Answer"
                    )}
                  </Button>
                </div>
              </>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
