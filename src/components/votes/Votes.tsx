"use client";

import Image from "next/image";
import * as React from "react";
import { formatNumber } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ActionResponse } from "@/types/global";
import { HasVotedResponse } from "@/types/action";
import { createVote } from "../../lib/actions/vote.action";

interface VotesProps {
  upvotes: number;
  downvotes: number;
  targetType: "question" | "answer";
  targetId: string;
  hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({ upvotes, downvotes, hasVotedPromise, targetId, targetType }: VotesProps) => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { success, data } = React.use(hasVotedPromise);

  const [isLoading, setIsLoading] = React.useState(false);

  const [hasUpvoted, setHasUpvoted] = React.useState(data?.hasUpvoted ?? false);

  const [hasDownvoted, setHasDownvoted] = React.useState(data?.hasDownvoted ?? false);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId)
      return toast.error("Please log in to vote", {
        description: "Only logged in users can vote",
      });

    if (voteType === "upvote") {
      if (hasUpvoted) {
        setHasUpvoted(false);
      } else {
        setHasUpvoted(true);
        setHasDownvoted(false);
      }
    } else {
      if (hasDownvoted) {
        setHasDownvoted(false);
      } else {
        setHasDownvoted(true);
        setHasUpvoted(false);
      }
    }

    setIsLoading(true);
    try {
      const result = await createVote({ targetId, targetType, voteType });

      if (!result.success)
        return toast.error("Failed to vote", {
          description: result.error?.message,
        });

      const successMessage =
        voteType === "upvote"
          ? `Upvote ${!hasUpvoted ? "added" : "removed"} successfully`
          : `Downvote ${!hasDownvoted ? "added" : "removed"} successfully`;

      toast.success(successMessage, {
        description: "Your vote has been recorded.",
      });
    } catch (error) {
      toast.error("Failed to vote", {
        description: error instanceof Error ? error?.message : "An error occured while voting. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-center gap-2.5">
      <div className="flex-center gap-1.5">
        <Image
          src={hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
          alt="upvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{formatNumber(upvotes)}</p>
        </div>
      </div>
      <div className="flex-center gap-1.5">
        <Image
          src={hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
          alt="downvote"
          width={18}
          height={18}
          className={`cursor-pointer ${isLoading && "opacity-50"}`}
          aria-label="Downvote"
          onClick={() => !isLoading && handleVote("downvote")}
        />

        <div className="flex-center background-light700_dark400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark400_light900">{formatNumber(downvotes)}</p>
        </div>
      </div>
    </div>
  );
};

export default Votes;
