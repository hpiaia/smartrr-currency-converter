import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function run() {
  await prisma.conversion.create({
    data: { from: 'USD', to: 'BRL' },
  })
}

run()
