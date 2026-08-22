import * as React from "react";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import TagCard from "../cards/TagCard";
import { getHotQuestions } from "@/lib/actions/question.action";
import DataRenderer from "@/components/DataRenderer";
import { getTopTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const [{ success, data: hotQuestions, error }, { success: topTagsSuccess, data: topTags, error: topTagsError }] =
    await Promise.all([getHotQuestions(), getTopTags()]);
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border shadow-light-300 sticky top-0 right-0 flex h-screen w-87.5 flex-col gap-6 overflow-y-auto border-l p-6 pt-36 max-lg:hidden dark:shadow-none">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <DataRenderer
          data={hotQuestions}
          empty={{ title: "No questions found", message: "No questions have been asked yet." }}
          success={success}
          error={error}
          render={(hotQuestions) => (
            <div className="mt-7 flex w-full flex-col gap-7.5">
              {hotQuestions.map((question) => (
                <Link
                  href={ROUTES.QUESTIONS(question._id)}
                  key={question._id}
                  className="flex cursor-pointer items-center justify-between gap-7"
                >
                  <p className="body-medium text-dark500_light700 line-clamp-2">{question.title}</p>
                  <Image
                    src="/icons/chevron-right.svg"
                    alt="Chevron Right"
                    width={20}
                    height={20}
                    className="invert-colors"
                  />
                </Link>
              ))}
            </div>
          )}
        />
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <DataRenderer
          data={topTags}
          empty={{ title: "No questions found", message: "No questions have been asked yet." }}
          success={topTagsSuccess}
          error={topTagsError}
          render={(topTags) => (
            <div className="mt-7 flex w-full flex-col gap-4">
              {topTags.map(({ _id, name, questions }) => (
                <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default RightSidebar;
