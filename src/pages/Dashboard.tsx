import { DashboardCard } from "@/components/DashboardCard";
import PageLayout from "@/layout/PageLayout";

const Dashboard = () => {
    return (
        <PageLayout breadcrumList={[{ name: "Dashboard", path: "/" }]} title="ILMS">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
                <DashboardCard title="WOS" navigateTo="./wos" >
                    <div className="space-x-2">
                        <span >Pending WOS :</span>
                        <span>2</span>
                    </div>
                </DashboardCard>
            </div>
        </PageLayout>
    );
};

export default Dashboard;
