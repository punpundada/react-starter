import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/layout/PageLayout";
import { ExtendedColumnDef } from "@/type/utils";

const breadcrumList = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Audit Groups",
    path: "/groups",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const columns: ExtendedColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    header_className: "This is header className",
  },
  {
    accessorKey: "email",
    header: "Email",
    onClick(_, row) {
      alert(JSON.stringify(row, null, 2));
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <Button className="" variant={"outline"}>
          View Customers
        </Button>
      );
    },
  },
];
const data = Array.from({ length: 20 }).fill({
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "m@example.com",
} as const) as Payment[];

const Groups = () => {
  return (
    <PageLayout
      breadcrumList={breadcrumList}
      title="IVMS Audit Module | Groups"
    >
      <Card className="">
        <CardHeader>
          <CardTitle>Audit Groups</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[595px] overflow-auto relative">
          <DataTable
            columns={columns}
            data={data}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Groups;
