import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link } from "react-router-dom";

export type BreadcrumbType = { name: string; path: string };

export interface Breadcrums {
  list: BreadcrumbType[];
}

const BreadCrums = React.memo(({ list }: Breadcrums) => {
  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        {list.map((Item, index) => {
          return index + 1 != list.length ? (
            <>
              <BreadcrumbItem key={Item.path}>
                {Item.name.startsWith("_") ? (
                  <BreadcrumbPage>{Item.name.replace("_", "")}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={Item.path}>{Item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          ) : (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage>{Item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

export default BreadCrums;
