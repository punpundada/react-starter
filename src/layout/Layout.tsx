import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";
import React from "react";

const Layout = React.memo(() => {
  return (
    <SidebarProvider defaultOpen className="h-screen">
      <AppSidebar />
      <SidebarInset className="h-full">
          <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
});

export default Layout;
