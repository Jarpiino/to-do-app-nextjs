import mongoose from "mongoose";

const todSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const Tod = mongoose.models.Tod || mongoose.model("Tod", todSchema);

export default Tod;
