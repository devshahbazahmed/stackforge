import { NextRequest, NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { APIErrorResponse } from "@/types/global";
import { UserSchema } from "@/lib/validations";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import User from "@/database/user.model";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const validatedData = await UserSchema.partial().safeParse({ email });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const user = await User.findOne({ email });

    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
