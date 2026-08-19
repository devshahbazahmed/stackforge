import * as React from "react";
import { RouteParams } from "@/types/global";

const QuestionDetailsPage = async ({ params }: RouteParams) => {
  const { id } = await params;
  return <div>Question Detail: {id}</div>;
};

export default QuestionDetailsPage;
