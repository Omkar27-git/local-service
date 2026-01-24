import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  provider: "local" | "google";
  isEmailVerified: boolean;
  emailVerificationToken?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "local";
      },
      select: false
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    },

    isEmailVerified: {
      type: Boolean,
      default: false
    },

    emailVerificationToken: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
