import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Command, CommandInput } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  SidebarGroupContent,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { authActions } from "@/store/slices/auth";
import { useAppSelector } from "@/store/store";

import {
  ChevronDown,
  LayoutDashboard,
  TextQuote,
  Proportions,
  ReceiptText,
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
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
type SideBarItem = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  url: string;
  children?: SideBarItem[];
  allowedRoles?: string[] | "ALL";
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
    allowedRoles: ["NLAO"],
  },
  {
    title: "Scheduling",
    icon: Proportions,
    url: "/scheduling",
    children: [
      {
        title: "Gatepass",
        icon: Proportions,
        url: "/scheduling/gatepass",
      },
      {
        title: "Store Receipt",
        icon: ReceiptText,
        url: "/scheduling/store-receipt",
      },
    ],
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
  //     title: "Observation/Objection",
  //     icon: Binoculars,
  //     url: "/observations",
  // },
] satisfies SideBarItem[];

const shouldAutoOpen = (item: SideBarItem, query: string) => {
  if (!query) return false;

  const q = query.toLowerCase();

  if (item.title.toLowerCase().includes(q)) return true;

  if (item.children) {
    return item.children.some((child) => child.title.toLowerCase().includes(q));
  }

  return false;
};

const filterItems = (items: SideBarItem[], query: string): SideBarItem[] => {
  if (!query) return items;

  return items
    .map((item) => {
      const matchSelf = item.title.toLowerCase().includes(query.toLowerCase());

      if (item.children) {
        const filteredChildren = filterItems(item.children, query);

        if (filteredChildren.length > 0 || matchSelf) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }

      return matchSelf ? item : null;
    })
    .filter(Boolean) as SideBarItem[];
};

const handleKeyNav = (e: React.KeyboardEvent<HTMLUListElement>) => {
  const items = Array.from(
    document.querySelectorAll("[data-menu-item]"),
  ) as HTMLElement[];

  const index = items.indexOf(document.activeElement as HTMLElement);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    items[index + 1]?.focus();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    items[index - 1]?.focus();
  }
};

const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setTheme, theme } = useTheme();

  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const name = useAppSelector((s) => s.authReducer.user?.name);
  const roles = useAppSelector((s) => s.authReducer.user?.roles);
  const selectedRole = useAppSelector((s) => s.authReducer.user?.selectedRole);
  const filteredItems = React.useMemo(() => filterItems(items, query), [query]);

  const onSignout = () => {
    dispatch(authActions.signout());
    navigate("/auth/login");
  };

  const changeRole = (role: string) => {
    dispatch(authActions.changeRole(role));
  };

  const shouldAllow = (allowedRoles?: string[] | "ALL") => {
    if (!allowedRoles) return true;
    if (allowedRoles === "ALL") return true;
    if (selectedRole && allowedRoles.includes(selectedRole)) return true;
    return false;
  };

  const disableLink = (
    isAllowed: boolean,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!isAllowed) {
      e.preventDefault();
      toast.error("You are not authorized to access this page");
    }
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      // "/" shortcut
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setQuery("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="bg-accent z-30"
    >
      <SidebarHeader>
        <div className="p-2 ">
          <Command className="rounded-lg border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition">
            <CommandInput
              placeholder="Search menu..."
              value={query}
              onValueChange={setQuery}
              ref={inputRef}
            />
          </Command>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between ">
        <ScrollArea>
          <ScrollBar />
          <SidebarGroup>
            {/* <SidebarGroupLabel>ILMS Menu</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu onKeyDown={handleKeyNav}>
                {filteredItems.map((item) => {
                  const isAllowed = shouldAllow(item.allowedRoles);
                  return !item?.children?.length ? (
                    <SidebarMenuItem key={item.title} className="my-2">
                      <SidebarMenuButton
                        asChild
                        disabled={!isAllowed}
                        className={cn("", {
                          "hover:cursor-not-allowed": !isAllowed,
                        })}
                      >
                        <Button
                          asChild
                          variant="ghost"
                          className="w-full justify-start"
                          aria-expanded={shouldAutoOpen(item, query)}
                          aria-controls={`submenu-${item.title}`}
                        >
                          <Link
                            to={item.url ? item.url : ""}
                            onClick={(e) => disableLink(isAllowed, e)}
                            data-menu-item
                          >
                            {item.icon && <item.icon />}
                            <span>
                              {item.title
                                .split(new RegExp(`(${query})`, "gi"))
                                .map((part, i) =>
                                  part.toLowerCase() === query.toLowerCase() ? (
                                    <mark key={i}>{part}</mark>
                                  ) : (
                                    part
                                  ),
                                )}
                            </span>
                          </Link>
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <Collapsible
                      className="group/collapsible"
                      key={item.title}
                      open={shouldAutoOpen(item, query) || undefined}
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger
                          asChild
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              e.currentTarget.click();
                            }
                          }}
                        >
                          <SidebarMenuButton>
                            {item.title}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub id={`submenu-${item.title}`}>
                            {item.children.map((child) => {
                              const isChildAllowed = shouldAllow(
                                child.allowedRoles,
                              );
                              return (
                                <SidebarMenuSubItem key={child.title}>
                                  <SidebarMenuButton
                                    asChild
                                    disabled={!isChildAllowed}
                                    className={cn("", {
                                      "hover:cursor-not-allowed":
                                        !isChildAllowed,
                                    })}
                                  >
                                    <Button
                                      asChild
                                      variant="ghost"
                                      className="w-full flex justify-start"
                                      data-menu-item
                                    >
                                      <Link
                                        to={child.url}
                                        onClick={(e) =>
                                          disableLink(isChildAllowed, e)
                                        }
                                        data-menu-item
                                      >
                                        <child.icon />
                                        <span>
                                          {child.title
                                            .split(
                                              new RegExp(`(${query})`, "gi"),
                                            )
                                            .map((part, i) =>
                                              part.toLowerCase() ===
                                              query.toLowerCase() ? (
                                                <mark key={i}>{part}</mark>
                                              ) : (
                                                part
                                              ),
                                            )}
                                        </span>
                                      </Link>
                                    </Button>
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
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Roles</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {roles?.map((x) => {
                          return (
                            <DropdownMenuItem
                              onClick={() => changeRole(x)}
                              key={x}
                            >
                              {x}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
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

/*
type SearchBooksParams struct {
	MinBookID     int32       `json:"min_book_id"`
	AuthorID      interface{} `json:"author_id"`
	TitleSearch   interface{} `json:"title_search"`
	OnlyAvailable interface{} `json:"only_available"`
	LimitCount    int32       `json:"limit_count"`
}

*/