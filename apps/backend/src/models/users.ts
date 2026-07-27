import { Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface UserMethods {
  createJWT: () => void;
  comparePassword: (
    canditatePassword: string | Buffer<ArrayBufferLike>,
  ) => Promise<boolean>;
}

type UserModel = Model<User, Model<User>, UserMethods>;

const userSchema = new Schema<User, UserModel, UserMethods>({
  firstname: {
    type: String,
    required: [true, "Please provide your first name."],
    minlength: 2,
    maxlength: 15,
  },
  lastname: {
    type: String,
    required: [true, "Please provide your last name"],
    minlength: 2,
    maxlength: 15,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 2,
    maxlength: 20,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("createJWT", function () {
  return jwt.sign(
    { userId: this._id, password: this.password },
    process.env.JWT_SECRET ?? "",
    {
      expiresIn: (process.env.JWT_LIFETIME as any) ?? 0,
    },
  );
});

userSchema.method(
  "comparePassword",
  async function (canditatePassword: string | Buffer<ArrayBufferLike>) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  },
);

export default model<User, UserModel>("Users", userSchema);
