import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
  //   {
  //     todos: [
  //       {
  //         id: {
  //           type: String,
  //           unique: true,
  //           required: true,
  //         },
  //         todoname: {
  //           type: String,
  //           unique: true,
  //           required: true,
  //         },
  //         completed: {
  //           type: Boolean,
  //           required: true,
  //         },
  //       },
  //     ],
  //   }
);
const modelName =
  mongoose.models.modelName || mongoose.model("User", userSchema);
export default modelName;
