import { model, models, Schema, Document } from "mongoose";

export interface ICollection {
  question: Schema.Types.ObjectId;
  author: Schema.Types.ObjectId;
}

export type ICollectionDoc = ICollection & Document;

const collectionSchema = new Schema<ICollection>(
  {
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Collection = models?.Collection || model<ICollection>("Collection", collectionSchema);

export default Collection;
