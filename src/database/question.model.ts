import { model, models, Schema, Document } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views?: number;
  answers?: number;
  upvotes?: number;
  downvotes?: number;
  author: Schema.Types.ObjectId;
}

export type IQuestionDoc = IQuestion & Document;

const questionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Question = models?.Question || model<IQuestion>("Question", questionSchema);

export default Question;
