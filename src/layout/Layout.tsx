import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import AppSidebar from "./app-sidebar";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen>
        <AppSidebar />
      <main>
        <SidebarTrigger/>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
