import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | VMusic",
    default: "VMusic",
  },
  description: "VMusic",
};
const AuthLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession();

  if (session) {
    return redirect("/");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
