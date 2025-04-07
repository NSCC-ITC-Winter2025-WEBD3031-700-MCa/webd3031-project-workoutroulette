import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  if (users.length === 0) {
    console.error("No users found to assign payments. Seed users first.")
    return
  }

  const payments = []

  const today = new Date()
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const numPayments = Math.floor(Math.random() * 5) + 2 // 2–6 payments/month
    for (let j = 0; j < numPayments; j++) {
      const user = users[Math.floor(Math.random() * users.length)]
      payments.push({
        userId: user.id,
        amount: parseFloat((Math.random() * 20 + 9.99).toFixed(2)),
        createdAt: monthDate,
      })
    }
  }

  await prisma.stripePayment.createMany({ data: payments })
  console.log(`✅ Seeded ${payments.length} StripePayments.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
