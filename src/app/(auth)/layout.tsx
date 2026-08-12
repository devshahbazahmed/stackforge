import * as React from "react";
import Image from "next/image";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-10">
      <div className="bg-auth-light dark:bg-auth-dark absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-30" />
      <section className="light-border background-light800_dark200 shadow-light-100_dark100 ro min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8">
        <div className="flex items-center justify-center gap-2">
          <Image src="/images/site-logo.png" alt="StackForge Logo" width={80} height={80} className="object-contain" />
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">
              Join Stack<span className="text-primary-500">Forge</span>
            </h1>
            <p className="paragraph-regular text-dark500_light400">To get your questions answered</p>
          </div>
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
