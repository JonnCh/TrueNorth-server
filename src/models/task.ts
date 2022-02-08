import { ITask } from "../types/task";
import { model, Schema } from "mongoose";

const taskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default model<ITask>("Task", taskSchema);