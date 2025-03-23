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
      <h1 className="text-xl font-bold mb-2">{user.name}</h1>
      <p className="text-gray-500">{user.email}</p>

      <ProfileEditor user={user} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center mt-6">
        <div>
          <p className="text-2xl font-bold">{user.completedWorkouts}</p>
          <p className="text-sm text-gray-600">Workouts</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.completedExercises}</p>
          <p className="text-sm text-gray-600">Exercises</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.xp}</p>
          <p className="text-sm text-gray-600">XP</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{user.level}</p>
          <p className="text-sm text-gray-600">Level</p>
        </div>
      </div>
    </div>
  );
}