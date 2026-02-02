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
      type: String,
      required: true
    },
    images: {
      type: [String],
      default: []
    },
    isApproved: {
      type: Boolean,
      default: false // ✅ FIXED
    }
  },
  { timestamps: true }
);

export default mongoose.model("Business", businessSchema);
