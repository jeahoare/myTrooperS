import mongoose, { Schema } from "mongoose";

const Task = new mongoose.Schema(
  {
    title: { type: String },
    comment: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "UserData" },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserData",
        default: [],
      },
    ],
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "tasks" }
);

export default mongoose.model("TaskData", Task);
