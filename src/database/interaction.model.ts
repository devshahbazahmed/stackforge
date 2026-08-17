import { model, models, Schema } from "mongoose";

export interface IInteraction {
  user: Schema.Types.ObjectId;
  action: string;
  actionId: Schema.Types.ObjectId;
  actionType: "question" | "answwer";
}

export type IInteractionDoc = IInteraction & Document;

const interactionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, required: true, enum: ["question", "answer"] },
  },
  { timestamps: true }
);

const Interaction = models?.Interaction || model<IInteraction>("Interaction", interactionSchema);

export default Interaction;
