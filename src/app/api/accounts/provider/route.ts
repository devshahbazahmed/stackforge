import { NextRequest, NextResponse } from "next/server";
import handleError from "@/lib/handlers/error";
import { APIErrorResponse } from "@/types/global";
import { AccountSchema } from "@/lib/validations";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import Account from "@/database/account.model";

export async function POST(request: NextRequest) {
  const { providerAccountId } = await request.json();

  try {
    const validatedData = await AccountSchema.partial().safeParse({ providerAccountId });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const account = await Account.findOne({ providerAccountId });

    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
