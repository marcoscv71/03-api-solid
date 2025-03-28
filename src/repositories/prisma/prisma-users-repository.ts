import { prisma } from "@/lib/prisma";
import { Prisma, type User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string) {
    // Verifica se ja existe um usuario com email cadastrado
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
