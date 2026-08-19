import * as React from "react";
import QuestionForm from "@/components/forms/QuestionForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const AskQuestionPage = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask A Question</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
};

export default AskQuestionPage;
