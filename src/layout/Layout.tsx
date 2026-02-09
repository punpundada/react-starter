import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "./app-sidebar";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/auth";

const Layout = React.memo(() => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }
    }, [user, navigate]);

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
