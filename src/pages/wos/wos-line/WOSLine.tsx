import DataTable from "@/components/DataTable";
import { InputController } from "@/components/form-control/InputController";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useVetWOSMutation, useWOSLineList } from "@/hooks/wos/wos-hooks";
import PageLayout from "@/layout/PageLayout";
import { getPageParam } from "@/lib/utils";
import { ExtendedColumnDef } from "@/type/utils";
import { vettedQtySchema, WOSLineType } from "@/type/wos/wos-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useSearchParams } from "react-router-dom";

export type VetQuantityType = {
  VettedQty: number;
  WOSLineSerial: number;
};

export type VetType = {
  WOSSerial: number;
  Lines: VetQuantityType[];
};

function WOSLine() {
  const { wosserial } = useParams();
  const [searchParams] = useSearchParams();
  const page = getPageParam(searchParams);

  const wosLineQuery = useWOSLineList({ wosserial: Number(wosserial) });

  const form = useForm<VetType>({
    defaultValues: {
      Lines: [],
      WOSSerial: Number(wosserial),
    },
    resolver: zodResolver(vettedQtySchema),
  });
  const mutation = useVetWOSMutation();

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
      accessorKey: "AuthorisedQty",
      header: "Authorized Qty",
    },
    {
      accessorKey: "ReceivedQty",
      header: "Received Qty",
    },
    {
      accessorKey: "BalanceQty",
      header: "Balance Qty",
    },
    {
      accessorKey: "ReviewedQty",
      header: "Reviewed Qty",
    },
    {
      accessorKey: "Price",
      header: "Price",
    },
    {
      accessorKey: "VettedQty",
      header: "Vetted Qty",
      cell: ({ row }) => {
        return (
          <InputController
            control={form.control}
            name={`Lines.${row.index}.VettedQty`}
            placeholder="Qty"
            onChange={() => {
              form.setValue(
                `Lines.${row.index}.WOSLineSerial`,
                row.original.WOSLineSerial,
              );
            }}
          />
        );
      },
    },
    {
      accessorKey: "TotalCost",
      header: "Total Cost",
    },
    {
      accessorKey: "AuthorityDate",
      header: "Authority Date",
    },
  ];

  function saveVettedQty(data: VetType) {
    mutation.mutate(data);
  }

  React.useEffect(() => {
    form.setValue("Lines", wosLineQuery.data ?? []);
  }, [form, wosLineQuery.data]);

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(saveVettedQty)}
              className="space-y-4"
            >
              <DataTable
                columns={columns}
                // data={[]}
                data={wosLineQuery?.data ?? []}
                loading={wosLineQuery.isLoading}
                maxHeight="350px"
              />
              <Pagination page={page} pageCount={1} />
              <div className="flex justify-end">
                <Button>Save</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default WOSLine;
