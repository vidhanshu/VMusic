import { type Metadata } from "next";
import React, { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | VMusic",
    default: "VMusic",
  },
  description: "VMusic",
};
const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen items-center justify-center">{children}</div>
  );
};

export default AuthLayout;
