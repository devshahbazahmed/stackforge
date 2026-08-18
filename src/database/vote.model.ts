import { model, models, Schema, Document } from "mongoose";

export interface IVote {
  author: Schema.Types.ObjectId;
  id: Schema.Types.ObjectId;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export type IVoteDoc = IVote & Document;

const voteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    id: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true }
);

const Vote = models?.Vote || model<IVote>("Vote", voteSchema);

export default Vote;
