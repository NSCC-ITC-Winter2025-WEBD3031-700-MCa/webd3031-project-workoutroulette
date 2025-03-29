import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import WorkoutPage from "@/components/WorkoutPage";

export default async function Page() {
  // 1. Retrieve session from NextAuth
  const session = await getServerSession(authOptions);

  // 2. If no session, redirect to sign in
  if (!session) {
    redirect("/signin");
  }

  // 3. Otherwise, render the protected component
  return <WorkoutPage />;
}