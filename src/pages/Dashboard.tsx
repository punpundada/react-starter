import PageLayout from "@/layout/PageLayout";

const Dashboard = () => {
  return (
    <PageLayout breadcrumList={[{ name: "Dashboard", path: "/" }]} title="ILMS">
      This is dashboard of AUDIT MODULE
    </PageLayout>
  );
};

export default Dashboard;
