import * as React from "react";
import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@/auth";
import { notFound, redirect } from "next/navigation";
import { RouteParams } from "@/types/global";
import { getQuestion } from "@/lib/actions/question.action";
import ROUTES from "@/constants/routes";

const EditQuestionPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) redirect("/sign-in");

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success || !question) return notFound();

  if (!question.author?._id) return notFound();

  if (question.author._id.toString() !== session.user?.id) redirect(ROUTES.QUESTIONS(id));
  return (
    <main>
      <QuestionForm question={question} isEdit />
    </main>
  );
};

export default EditQuestionPage;
