import type { NextRequest, NextResponse } from "next/server"
import type { PrismaClient } from "@/lib/generated/prisma/client"
import prisma from "@/lib/prisma"

export type Context = {
  prisma: PrismaClient
}

export async function createContext(req: NextRequest, res: NextResponse): Promise<Context> {
  return {
    prisma,
  }
}
