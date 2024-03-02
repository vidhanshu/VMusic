"use client";

import { getUserByEmail } from "@/actions";
import NeedAuthToAccess from "@/components/auth/need-auth-to-access";
import Typography from "@/components/common/Typography";
import { Button } from "@nextui-org/react";
import { Heart, Share2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";

const YourPlayLists = () => {
  const { status, data } = useSession();
  const [userId, setUserId] = useState("");
  const [_, cpyFn] = useCopyToClipboard();

  useEffect(() => {
    if (!data?.user) return;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getUserByEmail(data.user.email!).then((user) => {
      if (user) setUserId(user.id);
    });
  }, [data?.user]);

  if (status === "authenticated") {
    return (
      <div className="flex items-center justify-between gap-x-4 rounded-md bg-primary-500 px-4">
        <Link className="flex-grow py-6" href="/liked-songs">
          <div className="flex items-center gap-x-4">
            <Heart className="h-4 w-4" /> <Typography>Liked songs</Typography>
          </div>
        </Link>
        <Button
          color="secondary"
          isIconOnly
          radius="full"
          size="sm"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            cpyFn(
              `${window.location.href}/shared?id=${userId}&playlist=liked-songs`,
            ).then(() => {
              toast("Link copied to clipboard");
            });
          }}
          endContent={<Share2 size={16} />}
        />
      </div>
    );
  }

  return <NeedAuthToAccess />;
};

export default YourPlayLists;
