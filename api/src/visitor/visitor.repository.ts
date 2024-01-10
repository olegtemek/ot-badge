import { Injectable } from '@nestjs/common';
import { Prisma, Repository } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';

@Injectable()
export class VisitorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async incrementOrCreate(
    data: Prisma.RepositoryUncheckedCreateInput,
  ): Promise<Repository> {
    return await this.prisma.repository.upsert({
      where: {
        fullPath: data.fullPath,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });
  }

  async findByFullPath(fullPath: string): Promise<Repository> {
    return await this.prisma.repository.findFirst({
      where: {
        fullPath,
      },
    });
  }
}
