import { auth } from "@/auth";
import { prisma } from "@/utils/prismaDB";
import { redirect } from "next/navigation";
import ProfileEditor from "./profileEditor";

export default async function ProfilePage() {
    const session = await auth();

  if (!session?.user?.email) {
    redirect("/signin"); 
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      image: true,
      aboutMe: true,
      completedWorkouts: true,
      completedExercises: true,
      xp: true,
      level: true,
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 rounded-md shadow-md bg-white">
      <h1 className="text-xl font-bold mb-2 text-dark">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>

      <ProfileEditor user={user} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center mt-6">
        <div>
          <p className="text-sm text-gray-600">Workouts</p>
          <p className="text-2xl font-bold text-dark">{user.completedWorkouts}</p>
        </div>
        <div>
        <p className="text-sm text-gray-600">Exercises</p>
          <p className="text-2xl font-bold text-dark">{user.completedExercises}</p>
        </div>
        <div>
        <p className="text-sm text-gray-600">XP</p>
          <p className="text-2xl font-bold text-dark">{user.xp}</p>
        </div>
        <div>
        <p className="text-sm text-gray-600">Level</p>
          <p className="text-2xl font-bold text-dark">{user.level}</p>
        </div>
      </div>
    </div>
  );
}