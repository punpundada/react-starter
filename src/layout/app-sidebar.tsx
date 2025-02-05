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

import {
  ChevronDown,
  LayoutDashboard,
  BookMarked,
  BookCheck,
  BookOpenText,
  TextQuote,
  StarHalf,
  ClipboardType,
  Blocks,
  MessageSquareQuote,
  Proportions,
  BadgeIndianRupee,
  BadgeAlert,
  Rocket,
  Package,
  ArrowUpFromLine,
  ArrowDownFromLine,
  Tickets,
  NotebookPen,
  ReceiptText,
  LandPlot,
  Binoculars,
  Cog,
  FileX2,
  HandPlatter,
  FolderSync,
  ShieldCheck,
  CreditCard,
  UtilityPole,
  ChevronUp,
  User2,
} from "lucide-react";
import { Link } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Demand",
    children: [
      {
        title: "Demand",
        url: "demand/demand",
        icon: BookMarked,
      },
      {
        title: "Authority",
        url: "demand/authority",
        icon: BookCheck,
      },
      {
        title: "Ledger",
        url: "demand/ledger",
        icon: BookOpenText,
      },
    ],
  },
  {
    title: "Provisioning",
    children: [
      {
        title: "Indent",
        url: "provisioning/indent",
        icon: TextQuote,
      },
      {
        title: "Review",
        url: "provisioning/review",
        icon: StarHalf,
      },
      {
        title: "BForm",
        url: "provisioning/bform",
        icon: ClipboardType,
      },
    ],
  },
  {
    title: "Procurement",
    children: [
      {
        title: "Tender",
        url: "provisioning/tender",
        icon: Blocks,
      },
      {
        title: "Quote",
        url: "provisioning/quote",
        icon: MessageSquareQuote,
      },
      {
        title: "Proc",
        url: "provisioning/proc",
        icon: Proportions,
      },
      {
        title: "Payment",
        url: "provisioning/payment",
        icon: BadgeIndianRupee,
      },
    ],
  },
  {
    title: "Delivery",
    children: [
      {
        title: "Issue Status",
        url: "delivery/issue-status",
        icon: BadgeAlert,
      },
      {
        title: "Release",
        url: "delivery/release",
        icon: Rocket,
      },
      {
        title: "Packing",
        url: "delivery/packing",
        icon: Package,
      },
      {
        title: "GatePass",
        url: "delivery/gatepass",
        icon: Tickets,
      },
      {
        title: "GateOut",
        url: "delivery/gateout",
        icon: ArrowDownFromLine,
      },
    ],
  },
  {
    title: "Receipt",
    children: [
      {
        title: "Gate In",
        url: "receipt/gatein",
        icon: ArrowUpFromLine,
      },
      {
        title: "INote",
        url: "receipt/inote",
        icon: NotebookPen,
      },
      {
        title: "Receipt",
        url: "receipt/receipt",
        icon: ReceiptText,
      },
      {
        title: "Survey",
        url: "receipt/survey",
        icon: LandPlot,
      },
      {
        title: "MIS-SRV",
        url: "receipt/mis-srv",
        icon: Binoculars,
      },
    ],
  },
  {
    title: "Tech Service",
    children: [
      {
        title: "Survey",
        url: "tech-survey/gatein",
        icon: LandPlot,
      },
      {
        title: "Repairable",
        url: "tech-survey/repairable",
        icon: Cog,
      },
      {
        title: "Disposal",
        url: "tech-survey/disposal",
        icon: FileX2,
      },
      {
        title: "Preservation",
        url: "tech-survey/preservation",
        icon: HandPlatter,
      },
    ],
  },
  {
    title: "Other",
    children: [
      {
        title: "Stock Transfer",
        url: "other/stock-transfer",
        icon: FolderSync,
      },
      {
        title: "Verification",
        url: "other/verification",
        icon: ShieldCheck,
      },
      {
        title: "BinCard",
        url: "other/bin-card",
        icon: CreditCard,
      },
      {
        title: "CWH-MIS",
        url: "other/cwh-mis",
        icon: UtilityPole,
      },
    ],
  },
];

const AppSidebar = () => {
  return (
    <Sidebar variant="floating" collapsible="offcanvas">
      <SidebarHeader />
      <SidebarContent className="flex flex-col justify-between">
        <ScrollArea>
          <ScrollBar />
          <SidebarGroup>
            <SidebarGroupLabel>ILMS Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  return !item.children?.length ? (
                    <SidebarMenuItem key={item.title}>
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
              <DropdownMenu >
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
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
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
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
