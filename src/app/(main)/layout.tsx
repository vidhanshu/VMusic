import React, { PropsWithChildren } from "react";

import CommonLayout from "@/components/common/common-layout";

const MainLayout = ({ children }: PropsWithChildren) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default MainLayout;
