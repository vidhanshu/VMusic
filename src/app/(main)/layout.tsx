import CommonLayout from "@/components/common/common-layout";

const MainLayout = ({ children }: React.PropsWithChildren) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default MainLayout;
