"use client";
import * as React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validations";
import Image from "next/image";
import { signUpWithCredentials } from "@/lib/actions/auth.action";

const SignUpPage = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <Image src="/images/site-logo.png" alt="StackForge Logo" width={80} height={80} className="object-contain" />
        <div className="space-y-2.5">
          <h1 className="h2-bold text-dark100_light900">
            Join Stack<span className="primary-text-gradient">Forge</span>
          </h1>

          <p className="paragraph-regular text-dark500_light400">To get your questions answered and help your peers.</p>
        </div>
      </div>

      <AuthForm
        formType="SIGN_UP"
        schema={SignUpSchema}
        defaultValues={{ email: "", password: "", name: "", username: "" }}
        onSubmit={signUpWithCredentials}
      />
    </>
  );
};

export default SignUpPage;
