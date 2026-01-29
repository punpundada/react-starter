import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageLayout from "@/layout/PageLayout";
import { ExtendedColumnDef } from "@/type/utils";
import { WOSMasterType } from "@/type/wos/wos-types";
import { Link } from "react-router-dom";

const breadcrumList = [
  { name: "Dashboard", path: "/" },
  { name: "WOS", path: "wos" },
];

const tableData: WOSMasterType[] = [
  {
    WOSSerial: 1001,
    CustomerCode: "CUST",
    WOSType: "NEW",
    InitiatedBy: "EMP001",
    DateTimeInitiated: "2026-01-28T09:30:00Z",
    ConcurredBy: "EMP002",
    DateTimeConcurred: "2026-01-28T11:00:00Z",
    UOINumber: "UOI-2026-001",
    UOIDate: "2026-01-28T12:00:00Z",
    ApprovedBy: "MGR01",
    DateTimeApproved: "2026-01-28T14:00:00Z",
    SanctionNo: "SAN-7789",
    SanctionDate: "2026-01-28T15:00:00Z",
    ClosedBy: "EMP003",
    DateTimeClosed: null,
    Remarks: "Completed",
  },
  {
    WOSSerial: 1002,
    CustomerCode: "ACME",
    WOSType: "MOD",
    InitiatedBy: "EMP010",
    DateTimeInitiated: "2026-01-27T10:00:00Z",
    ConcurredBy: "EMP002",
    DateTimeConcurred: "2026-01-28T12:00:00Z",
    UOINumber: "UOI-2026-001",
    UOIDate: "2026-01-28T12:00:00Z",
    ApprovedBy: "EMP002",
    DateTimeApproved: "2026-01-28T12:00:00Z",
    SanctionNo: "SAN-7789",
    SanctionDate: "2026-01-28T15:00:00Z",
    ClosedBy: null,
    DateTimeClosed: null,
    Remarks: "Waiting for concurrence",
  },
];

const columns: ExtendedColumnDef<WOSMasterType>[] = [
  {
    accessorKey: "WOSSerial",
    header: "WOS Serial",
    cell: ({ row }) => {
      return (
        <Link
          className="text-blue-600 hover:underline"
          to={`/wos/${row.original.WOSSerial}`}
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
  // {
  //   accessorKey: "UOIDate",
  //   header: "UOI Date",
  // },
  {
    accessorKey: "UOINumber",
    header: "UOI Number",
  },
  {
    accessorKey: "Responce",
    header: "Action",
    cell: () => {
      return <Button variant={"secondary"}>Response</Button>;
    },
  },
  // {
  //   accessorKey: "ConcurredBy",
  //   header: "Concurred By",
  // },
];

const WarrentOfStores = () => {
  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>WOS</CardTitle>
          <CardDescription>WOS Master List</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tableData} />
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default WarrentOfStores;
