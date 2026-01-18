import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    location: {
      type: String,
      required: true
    },
    isApproved: {
      type: Boolean,
      default: false
    },

    images: [
      {
        type: String
      }

    ]
  },
  { timestamps: true }
);

export default mongoose.model("Business", businessSchema);
