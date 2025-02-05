import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/layout/PageLayout";

const breadcrumList = [
  { name: "Dashboard", path: "/" },
  {
    name: "_Demand",
    path: "/demand/demand",
  },
  { name: "Authority", path: "/demand/authority" },
];

const Authority = () => {
  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS | Demand">
      <Card>
        <CardHeader>
          <CardTitle>Authority</CardTitle>
        </CardHeader>
      </Card>
    </PageLayout>
  );
};

export default Authority;
