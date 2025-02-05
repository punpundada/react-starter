import PageLayout from "@/layout/PageLayout";
import { GreeterClient } from "@/gen/GreetServiceClientPb";
import { GreetRequest } from "@/gen/greet_pb";
const client = new GreeterClient("", null, null);

const Dashboard = () => {
  const onSubmit = () => {
    const request = new GreetRequest();
    request.setName("");
    request.setAge(8);
    client.greet(request, {}, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      res.getGreeting();
    });
  };

  return (
    <PageLayout breadcrumList={[{ name: "Dashboard", path: "/" }]} title="ILMS">
      This is dashboard of ILMS
      <form action="" onSubmit={onSubmit}>
        this is form
      </form>
    </PageLayout>
  );
};

export default Dashboard;
