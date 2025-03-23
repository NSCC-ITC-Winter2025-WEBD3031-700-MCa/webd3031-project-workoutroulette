import { auth } from "@/auth";
import { prisma } from "@/utils/prismaDB";
import Image from "next/image";
import { redirect } from "next/navigation";

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
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={user.image || "/default-profile.png"}
          alt="Profile Picture"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold">About Me</h2>
        <p>{user.aboutMe || "No bio yet."}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
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