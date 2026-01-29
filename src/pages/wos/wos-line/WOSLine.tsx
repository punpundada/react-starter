import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageLayout from "@/layout/PageLayout";
import React from "react";
import { useParams } from "react-router-dom";

function WOSLine() {
  const { wosserial } = useParams();

  const breadcrumList = React.useMemo(
    () => [
      { name: "Dashboard", path: "/" },
      { name: "WOS", path: "/wos" },
      { name: `${wosserial}`, path: "/pa" },
    ],
    [wosserial],
  );

  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>WOS</CardTitle>
          <CardDescription>WOS Items</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <DataTable columns={columns} data={tableData} /> */}
          table
          <p>{wosserial}</p>
        </CardContent>
      </Card>
    </PageLayout>
  );
}

export default WOSLine;
