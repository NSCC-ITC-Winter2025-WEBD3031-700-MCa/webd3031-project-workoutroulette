import { auth } from "@/auth";
import { prisma } from "@/utils/prismaDB";
import { redirect } from "next/navigation";
import ProfileEditor from "./profileEditor";
import { xpForLevel, getLevelFromXp } from "@/utils/XP";

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

  const XPBar = ({ xp }: { xp: number }) => {
    const level = getLevelFromXp(xp);
    const xpCurrent = xpForLevel(level);
    const xpNext = xpForLevel(level + 1);
    const progress = xp - xpCurrent;
    const needed = xpNext - xpCurrent;
    const percent = Math.min((progress / needed) * 100, 100);

    return (
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium mb-1">
          <span>Level {level}</span>
          <span>
            {progress} / {needed} XP
          </span>
        </div>
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden dark:bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto pt-36 p-6 rounded-md shadow-md bg-white">
      <h1 className="text-xl font-bold mb-1 mt-4 text-dark">{user.name}</h1>
      <p className="text-gray-500 mb-4">{user.email}</p>

      <ProfileEditor user={user} />

      <XPBar xp={user.xp} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-600">Workouts</p>
          <p className="text-2xl font-bold text-dark">{user.completedWorkouts}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Exercises</p>
          <p className="text-2xl font-bold text-dark">{user.completedExercises}</p>
        </div>
      </div>

      {session?.user?.isAdmin && (
        <div className="mt-6 text-center">
          <a
            href="/dashboard-system-panel"
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Go to Admin Dashboard
          </a>
        </div>
      )}
    </div>
  );
}