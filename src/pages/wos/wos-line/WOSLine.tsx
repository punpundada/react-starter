import DataTable from "@/components/DataTable";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWOSLineList } from "@/hooks/wos/wos-hooks";
import PageLayout from "@/layout/PageLayout";
import { getPageParam } from "@/lib/utils";
import { ExtendedColumnDef } from "@/type/utils";
import { WOSLineType } from "@/type/wos/wos-types";
import React from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

function WOSLine() {
  const { wosserial } = useParams();
  const [searchParams] = useSearchParams();
  const page = getPageParam(searchParams);

  const wosLineQuery = useWOSLineList({ wosserial: Number(wosserial) });

  const breadcrumList = React.useMemo(
    () => [
      { name: "Dashboard", path: "/" },
      { name: "WOS", path: "/wos" },
      { name: `${wosserial}`, path: "/pa" },
    ],
    [wosserial],
  );

  const columns: ExtendedColumnDef<WOSLineType>[] = [
    {
      accessorKey: "ItemCode",
      header: "Item Code",
    },
    {
      accessorKey: "ItemDesc",
      header: "Item Desc",
    },
    {
      accessorKey: "ItemDeno",
      header: "Item Deno",
    },
    {
      accessorKey: "Price",
      header: "Price",
    },
    {
      accessorKey: "ReviewedQty",
      header: "Reviewed Qty",
    },
    {
      accessorKey: "VettedQty",
      header: "Vetted Qty",
    },
    {
      accessorKey: "TotalCost",
      header: "Total Cost",
    },
    {
      accessorKey: "BalanceQty",
      header: "Balance Qty",
    },
    {
      accessorKey: "RecommendedQty",
      header: "Recommended Qty",
    },
    {
      accessorKey: "ReceivedQty",
      header: "Received Qty",
    },
    {
      accessorKey: "AuthorisedQty",
      header: "Authorized Qty",
    },
    {
      accessorKey: "AuthorityDate",
      header: "Authority Date",
    },
  ];

  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>WOS</CardTitle>
          <CardDescription>WOS Items</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Link to={`../response/${wosserial}`}>Response</Link>
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={wosLineQuery?.data ?? []}
            loading={wosLineQuery.isLoading}
          />
          <Pagination page={page} pageCount={1} />
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default WOSLine;
