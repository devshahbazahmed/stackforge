"use server";

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "@/lib/handlers/action";
import { SignUpSchema } from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import { signIn } from "@/auth";

export async function signUpWithCredentials(params: AuthCredentials): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { username, name, email, password } = validationResult.params!;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const existingUsername = await User.findOne({ username }).session(session);

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create([{ username, name, email, password: hashedPassword }], { session });

    console.log(newUser);

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
