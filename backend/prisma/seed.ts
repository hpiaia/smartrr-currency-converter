import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  const conversions = [
    { from: 'USD', to: 'BRL' },
    { from: 'BRL', to: 'USD' },
  ]

  await prisma.conversion.createMany({
    data: conversions,
  })
}

run()
