const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with test users...");

  await prisma.user.createMany({
    data: [
      {
        email: "user1@example.com",
        name: "User One",
        completedWorkouts: 5,
        completedExercises: 15,
        xp: 500,
        level: 3,
      },
      {
        email: "user2@example.com",
        name: "User Two",
        completedWorkouts: 8,
        completedExercises: 25,
        xp: 800,
        level: 5,
      },
      {
        email: "user3@example.com",
        name: "User Three",
        completedWorkouts: 2,
        completedExercises: 7,
        xp: 200,
        level: 2,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
