import { PrismaClient, Owner, Prisma } from '@prisma/client';

class PrismaService {
  #prisma = new PrismaClient();

  async disconnect(): Promise<void> {
    return this.#prisma.$disconnect();
  }

  async findOwnerByEmail(email: string): Promise<Owner | null> {
    return this.#prisma.owner.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findOwnerById(id: number): Promise<Owner | null> {
    return this.#prisma.owner.findUnique({
      where: {
        id: id,
      },
    });
  }

  async registerOwner(data: Prisma.OwnerCreateInput): Promise<Owner> {
    return this.#prisma.owner.create({
      data,
    });
  }
}

export default PrismaService;

