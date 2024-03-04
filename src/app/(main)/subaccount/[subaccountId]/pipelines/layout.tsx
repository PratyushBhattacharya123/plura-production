import BlurPage from "@/components/global/blur-page";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const PipelinesLayout = ({ children }: Props) => {
  return <BlurPage>{children}</BlurPage>;
};

export default PipelinesLayout;
