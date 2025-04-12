// components/Admin/AdminDashboard.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";
import { prisma } from "@/utils/prismaDB";
import InfoCard from "@/components/Admin/Cards/InfoCard";
import {
  UserGroupIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import AdminLayout from "@/app/dashboard-system-panel/containers/Layout";
import UserTable from "@/app/dashboard-system-panel/users/UserTable";
import UserTypeChart from "@/components/Admin/Charts/UserTypeChart";
import RevenueChart from "@/components/Admin/Charts/RevenueChart"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    // Not an admin, redirect to home
    redirect("/404");
  }

  const users = await prisma.user.findMany({
    include: {
      payments: true,
    },
  });

  const enrichedUsers = users.map((user) => ({
    ...user,
    amount: user.payments.reduce((sum, p) => sum + p.amount, 0),
  }));

  const totalClients = users.length;
  const premiumUsers = users.filter((user) => user.isPremium).length;
  const payments = await prisma.stripePayment.findMany();
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

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
          <InfoCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`}>
            <CurrencyDollarIcon className="w-6 h-6 mr-4 text-blue-500" />
          </InfoCard>
        </div>

        <UserTable users={enrichedUsers} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <UserTypeChart premiumCount={premiumUsers} freeCount={totalClients - premiumUsers} />
          <RevenueChart payments={payments} />
        </div>
      </div>
    </AdminLayout>
  );
}
