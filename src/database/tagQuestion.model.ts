import { model, models, Schema, Document } from "mongoose";

export interface ITagQuestion {
  question: Schema.Types.ObjectId;
  tag: Schema.Types.ObjectId;
}

export type ITagQuestionDoc = ITagQuestion & Document;

const tagQuestionSchema = new Schema<ITagQuestion>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
  },
  { timestamps: true }
);

const TagQuestion = models?.TagQuestion || model<ITagQuestion>("TagQuestion", tagQuestionSchema);

export default TagQuestion;
