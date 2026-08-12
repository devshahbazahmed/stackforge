import * as React from "react";
import SocialAuthForm from "@/components/forms/SocialAuthForm";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative z-50 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="bg-auth-light dark:bg-auth-dark absolute inset-0 -z-50 bg-cover bg-center bg-no-repeat dark:opacity-30" />
      <section className="light-border background-light800_dark200 shadow-light-100_dark100 ro min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-130 sm:px-8">
        {children}
        <SocialAuthForm />
      </section>
    </main>
  );
};

export default AuthLayout;
