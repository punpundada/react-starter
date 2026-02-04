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
import { toast } from "react-toastify";

export type VetQuantityType = {
  VettedQty: number;
  WOSLineSerial: number;
  TotalCost: number;
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
      cell: ({ row: { original } }) =>
        Number(original.AuthorisedQty) - Number(original.ReceivedQty),
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
            onChange={(e) => {
              const val = e.currentTarget.value;

              form.setValue(
                `Lines.${row.index}.WOSLineSerial`,
                row.original.WOSLineSerial,
              );
              if (
                val &&
                !isNaN(Number(val)) &&
                row.original.Price &&
                !isNaN(row.original.Price)
              ) {
                form.setValue(
                  `Lines.${row.index}.TotalCost`,
                  Number(val) * row.original.Price,
                );
              }
            }}
          />
        );
      },
    },
    {
      accessorKey: "TotalCost",
      header: "Total Cost",
      cell: ({ row }) =>
        Number(row.original.VettedQty) * Number(row.original.Price),
    },
    {
      accessorKey: "AuthorityDate",
      header: "Authority Date",
    },
  ];

  function saveVettedQty(data: VetType) {
    mutation.mutate(data);
  }

  function copyReviewedQty() {
    wosLineQuery.data?.forEach((line, index) => {
      form.setValue(`Lines.${index}.VettedQty`, line.ReviewedQty);
      form.setValue(
        `Lines.${index}.TotalCost`,
        Number(line.ReviewedQty) * Number(line.Price),
      );
    });
    toast.success("Reviewed Qty Copied");
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
              <div className="flex justify-end gap-4">
                <Button type="button" onClick={copyReviewedQty}>
                  Copy Reviewed Qty
                </Button>
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
