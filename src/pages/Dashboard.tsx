import PageLayout from "@/layout/PageLayout";

const Dashboard = () => {
  return (
    <PageLayout breadcrumList={[{ name: "Dashboard", path: "/" }]} title="ILMS">
      This is dashboard of ILMS
      <form action="">this is form</form>
    </PageLayout>
  );
};

export default Dashboard;
