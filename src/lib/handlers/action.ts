"use server";

import * as z from "zod";
import { UnauthorizedError, ValidationError } from "@/lib/http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: z.ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({ params, schema, authorize = false }: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new ValidationError(error.flatten().fieldErrors as Record<string, string[]>);
      }

      return new Error("Schema validation failed");
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();

    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();

  return { params, session };
}

export default action;
