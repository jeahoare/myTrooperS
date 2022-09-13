import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, required: true },
  },
  { collection: "users" }
);

export default mongoose.model("UserData", User);
