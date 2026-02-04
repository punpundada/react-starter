import DataTable from "@/components/DataTable";
import DateController from "@/components/form-control/DateController";
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
import { useWOSMasterList } from "@/hooks/wos/wos-hooks";
import PageLayout from "@/layout/PageLayout";
import { getPageParam } from "@/lib/utils";
import { WOSMaterServiceParams } from "@/services/wos/wos-service";
import { useAppSelector } from "@/store/store";
import { ExtendedColumnDef } from "@/type/utils";
import { WOSMasterType } from "@/type/wos/wos-types";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

const breadcrumList = [
  { name: "Dashboard", path: "/" },
  { name: "WOS", path: "wos" },
];

const columns: ExtendedColumnDef<WOSMasterType>[] = [
  {
    accessorKey: "WOSSerial",
    header: "WOS Serial",
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue-600 hover:underline"
          to={`/wos/${row.original.WOSSerial}?page=1`}
        >
          {row.original.WOSSerial}
        </Link>
      );
    },
  },
  {
    accessorKey: "WOSType",
    header: "WOS Type",
  },
  {
    accessorKey: "CustomerCode",
    header: "Customer Code",
  },
  {
    accessorKey: "InitiatedBy",
    header: "Initiated By",
  },
  {
    accessorKey: "DateTimeInitiated",
    header: "Initiated Date",
  },
  {
    accessorKey: "ApprovedBy",
    header: "Approved Date",
  },
  {
    accessorKey: "SanctionNo",
    header: "Sanction No",
  },
  {
    accessorKey: "SanctionDate",
    header: "Saction Date",
  },
  {
    accessorKey: "Responce",
    header: "Action",
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link to={`response/${row.original.WOSSerial}`}>Response</Link>
        </Button>
      );
    },
  },
  // {
  //   accessorKey: "ConcurredBy",
  //   header: "Concurred By",
  // },
];

const WarrentOfStores = () => {
  const [searchParams] = useSearchParams();
  const page = getPageParam(searchParams);
  const stationCode = useAppSelector((s) => s.authReducer?.user?.stationCode);

  const form = useForm<WOSMaterServiceParams>({
    defaultValues: {
      customer_code: undefined,
      from_date: undefined,
      station_code: stationCode,
      to_date: undefined,
    },
  });
  const wosQuery = useWOSMasterList(form.watch());

  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>WOS</CardTitle>
          <CardDescription>WOS Master List</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <DateController
                control={form.control}
                name="from_date"
                placeholder="From Date"
                label="From Date"
                displayFormat={{
                  hour12: "dd-MM-YYYY",
                }}
              />
              <DateController
                control={form.control}
                name="to_date"
                placeholder="To Date"
                label="To Date"
              />
            </form>
          </Form>
          <DataTable
            columns={columns}
            data={wosQuery.data ?? []}
            loading={wosQuery.isLoading}
            maxHeight="350px"
          />
          <Pagination page={page} pageCount={1} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default WarrentOfStores;
