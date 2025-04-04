// components/Admin/AdminDashboard.tsx
import { prisma } from "@/utils/prismaDB";
import InfoCard from "@/components/Admin/Cards/InfoCard";
import {
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import AdminLayout from "@/app/dashboard-system-panel/containers/Layout";
import UserTable from "@/app/dashboard-system-panel/users/UserTable";

export default async function AdminDashboard() {
  const users = await prisma.user.findMany();
  const totalClients = users.length;
  const premiumUsers = users.filter((user) => user.isPremium).length;

  return (
    <AdminLayout>
      <div className="px-6 py-4">
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          <InfoCard title="Total clients" value={totalClients.toString()}>
            <UserGroupIcon className="w-6 h-6 mr-4 text-orange-500" />
          </InfoCard>
          <InfoCard title="Premium users" value={premiumUsers.toString()}>
            <ShoppingCartIcon className="w-6 h-6 mr-4 text-blue-500" />
          </InfoCard>
        </div>

        {/* Pass users down to the table */}
        <UserTable users={users} />
      </div>
    </AdminLayout>
  );
}
