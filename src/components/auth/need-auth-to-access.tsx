import React from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Typography from "../common/Typography";
import { Button } from "@nextui-org/react";

const NeedAuthToAccess = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Typography className="text-center" variant="T_Bold_H2">
        To access this page you need to be authenticated
      </Typography>
      <Button
        as={Link}
        href="/sign-in"
        className="text-white"
        color="success"
        startContent={<LogIn size={20} />}
      >
        Sign in
      </Button>
    </div>
  );
};

export default NeedAuthToAccess;
