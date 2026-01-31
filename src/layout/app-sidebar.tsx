import { useTheme } from "@/components/theme-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroupContent,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { authActions } from "@/store/slices/auth";
import { useAppSelector } from "@/store/store";

import {
  ChevronDown,
  LayoutDashboard,
  // TextQuote,
  // Proportions,
  // ReceiptText,
  Binoculars,
  ChevronUp,
  User2,
  LogOut,
  // Users,
  Moon,
  Sun,
  LucideProps,
  Ship,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
type SideBarItem = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  url: string;
  children?: SideBarItem[];
};
const items: SideBarItem[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "WOS",
    icon: Ship,
    url: "/wos",
  },
  // {
  //   title: "Groups",
  //   icon: Users,
  //   url: "/groups",
  // },
  // {
  //   title: "Ledger",
  //   icon: TextQuote,
  //   url: "/ledger",
  // },
  // {
  //   title: "Scheduling",
  //   children: [
  //     {
  //       title: "Gatepass",
  //       icon: Proportions,
  //       url: "/scheduling/gatepass",
  //     },
  //     {
  //       title: "Store Receipt",
  //       icon: ReceiptText,
  //       url: "/scheduling/store-receipt",
  //     },
  //   ],
  // },
  {
    title: "Observation/Objection",
    icon: Binoculars,
    url: "/observations",
  },
] satisfies SideBarItem[];

const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTheme, theme } = useTheme();
  const name = useAppSelector(s=>s.authReducer.user?.name);

  const onSignout = () => {
    dispatch(authActions.signout());
    navigate("/auth/login");
  };
  
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" className="bg-accent">
      <SidebarHeader />
      <SidebarContent className="flex flex-col justify-between ">
        <ScrollArea>
          <ScrollBar />
          <SidebarGroup>
            {/* <SidebarGroupLabel>ILMS Menu</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  return !item?.children?.length ? (
                    <SidebarMenuItem key={item.title} className="my-2">
                      <SidebarMenuButton asChild>
                        <Link to={item.url ? item.url : ""}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <Collapsible className="group/collapsible" key={item.title}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            {item.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => {
                              return (
                                <SidebarMenuSubItem key={child.title}>
                                  <SidebarMenuButton asChild>
                                    <Link to={child.url}>
                                      <child.icon />
                                      <span>{child.title}</span>
                                    </Link>
                                  </SidebarMenuButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> {name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                  alignOffset={500}
                  sideOffset={-30}
                  align="start"
                >
                  {theme === "light" ? (
                    <DropdownMenuItem
                      className="flex justify-between"
                      onClick={() => setTheme("dark")}
                    >
                      <span>Dark Mode</span>
                      <Moon />
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="flex justify-between"
                      onClick={() => setTheme("light")}
                    >
                      <span>Light Mode</span> <Sun />
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="flex justify-between"
                    onClick={onSignout}
                  >
                    <span>Sign out</span>
                    <LogOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
