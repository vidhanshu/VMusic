import NeedAuthToAccess from "@/components/auth/need-auth-to-access";
import { getServerSession } from "next-auth";
import React from "react";

const YourPlayLists = async () => {
  const session = await getServerSession();
  if (session) {
    return <div>Liked songs</div>;
  }

  return <NeedAuthToAccess />;
};

export default YourPlayLists;
