import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";
import AdminDashboard from "@/components/Admin/AdminDashboard";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.isAdmin) {
    redirect("/404"); // Or redirect to login or home
  }

  return <AdminDashboard />;
}
