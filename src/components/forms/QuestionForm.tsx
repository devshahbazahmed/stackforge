"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AskQuestionSchema } from "@/lib/validations";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@base-ui/react";
import { Button } from "@/components/ui/button";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import * as z from "zod";
import TagCard from "@/components/cards/TagCard";
import { createQuestion } from "@/lib/actions/question.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { ReloadIcon } from "@radix-ui/react-icons";

const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const router = useRouter();
  const editorRef = React.useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const handleCreateQuestion = async (data: z.infer<typeof AskQuestionSchema>) => {
    startTransition(async () => {
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Success", {
          description: "Question created successfully",
        });

        if (result.data) router.push(ROUTES.QUESTIONS(result.data?._id));
      } else {
        toast.error(`Error ${result.status}`, {
          description: result.error?.message || "Something went wrong",
        });
      }
    });
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: { value: string[] }) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag should be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "Tags are required",
      });
    }
  };

  return (
    <form id="question-form" className="flex w-full flex-col gap-10" onSubmit={form.handleSubmit(handleCreateQuestion)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
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
          )}
        />
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex w-full flex-col">
              <FieldLabel htmlFor="question-form-content" className="paragraph-semibold text-dark400_light800">
                Detailed explanation of your problem<span className="text-red-500">*</span>
              </FieldLabel>
              <Editor editorRef={editorRef} value={field.value} fieldChange={field.onChange} />
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Introduce the problem and expand on what you have put in the title.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="tags"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap flex w-full flex-col gap-3">
              <FieldLabel htmlFor="question-form-tags" className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-red-500">*</span>
              </FieldLabel>
              <div>
                <Input
                  id="question-form-tags"
                  aria-invalid={fieldState.invalid}
                  placeholder="Add tags"
                  autoComplete="off"
                  onKeyDown={(e) => handleInputKeyDown(e, field)}
                  className="paragraph-regular no-focus background-light700_dark300 light-border-2 text-dark300_light700 min-h-14 w-full rounded-md border px-3 py-2"
                />
                {field.value.length > 0 && (
                  <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                    {field.value.map((tag: string) => (
                      <TagCard
                        key={tag}
                        _id={tag}
                        name={tag}
                        compact
                        remove
                        isButton
                        handleRemove={() => handleTagRemove(tag, field)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <FieldDescription className="body-regular text-light-500 mt-2.5">
                Add upto 3 tags to describe what your question is about. You need to press enter to add a tag.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="mt-16 flex justify-end">
        <Button type="submit" className="primary-gradient !text-light-900 w-fit" disabled={isPending}>
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 size-4 animate-spin" />
              <span>Submitting</span>
            </>
          ) : (
            <>Ask Question</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default QuestionForm;
