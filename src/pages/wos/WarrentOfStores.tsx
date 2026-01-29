import DataTable from "@/components/DataTable";
import PageLayout from "@/layout/PageLayout";
import { ExtendedColumnDef } from "@/type/utils";

const breadcrumList = [
  { name: "Dashboard", path: "/" },
  { name: "WOS", path: "wos" },
];

export type UserRow = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  department: string;
  country: string;
  city: string;
  phone: string;
  company: string;
  plan: string;
  createdAt: string;
  lastLogin: string;
};

const tableData: UserRow[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "active",
    department: "Engineering",
    country: "USA",
    city: "New York",
    phone: "+1 555-1234",
    company: "Acme Corp",
    plan: "Enterprise",
    createdAt: "2023-05-12",
    lastLogin: "2024-12-10",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "inactive",
    department: "Marketing",
    country: "UK",
    city: "London",
    phone: "+44 20 7946 0958",
    company: "Globex Ltd",
    plan: "Pro",
    createdAt: "2022-11-03",
    lastLogin: "2024-10-01",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "active",
    department: "Sales",
    country: "Canada",
    city: "Toronto",
    phone: "+1 416-555-8899",
    company: "Initech",
    plan: "Free",
    createdAt: "2024-01-19",
    lastLogin: "2025-01-15",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana@example.com",
    role: "Manager",
    status: "active",
    department: "HR",
    country: "Germany",
    city: "Berlin",
    phone: "+49 30 123456",
    company: "Wayne Enterprises",
    plan: "Enterprise",
    createdAt: "2021-08-21",
    lastLogin: "2025-01-05",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    role: "Operator",
    status: "inactive",
    department: "Security",
    country: "France",
    city: "Paris",
    phone: "+33 1 987654",
    company: "IMF",
    plan: "Pro",
    createdAt: "2020-03-11",
    lastLogin: "2024-06-18",
  },
];

const columns: ExtendedColumnDef<UserRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "phone",
    header: "Name",
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
  },
];

const WarrentOfStores = () => {
  return (
    <PageLayout breadcrumList={breadcrumList} title="ILMS">
      Warrant of stores
      <DataTable columns={columns} data={tableData} />
    </PageLayout>
  );
};

export default WarrentOfStores;
