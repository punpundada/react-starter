import BreadCrums, { BreadcrumbType } from "@/components/BreadCrums";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Helmet } from "react-helmet";

export interface PageLayout {
  title: string;
  breadcrumList: BreadcrumbType[];
  children: React.ReactNode;
}
const PageLayout = React.memo(
  ({ breadcrumList, children, title }: PageLayout) => {
    return (
      <div className="space-y-2 h-full">
        <div>
          <div className="flex gap-3 pt-1 items-center">
            <SidebarTrigger />
            <Separator className="w-[2px] h-6" orientation="vertical" color="black" />
            <BreadCrums list={breadcrumList} />
          </div>
          <Helmet>
            <title>{title}</title>
          </Helmet>
        </div>
        <div className="h-[93.5%] pr-2">{children}</div>
      </div>
    );
  }
);

export default PageLayout;
