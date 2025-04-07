import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import WorkoutPage from "@/components/WorkoutPage";

// ✅ Add metadata export here
export const metadata = {
  title: "Start Workout | Workout Roulette",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return <WorkoutPage />;
}
