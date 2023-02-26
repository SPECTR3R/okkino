import { Injectable } from '@nestjs/common'
import { PrismaService } from '@okkino/api/data-access-db'
import {
  CreateOneHomeBlockArgs,
  DeleteOneHomeBlockArgs,
  FindUniqueHomeBlockArgs,
  UpdateOneHomeBlockArgs
} from '@okkino/api/generated-db-types'

@Injectable()
export class HomeBlockService {
  constructor(private readonly prisma: PrismaService) {}
  private static readonly INCLUDE_NESTED = { image: { include: { rgbBackground: true } } }

  create(createOneHomeBlockArgs: CreateOneHomeBlockArgs) {
    return this.prisma.homeBlock.create({
      data: createOneHomeBlockArgs.data,
      include: HomeBlockService.INCLUDE_NESTED
    })
  }

  findAll() {
    return this.prisma.homeBlock.findMany({ include: HomeBlockService.INCLUDE_NESTED })
  }

  findOne(findUniqueHomeBlockArgs: FindUniqueHomeBlockArgs) {
    const { where } = findUniqueHomeBlockArgs
    return this.prisma.homeBlock.findUnique({ where, include: HomeBlockService.INCLUDE_NESTED })
  }

  update(updateOneHomeBlockArgs: UpdateOneHomeBlockArgs) {
    return this.prisma.homeBlock.update({
      data: updateOneHomeBlockArgs.data,
      where: updateOneHomeBlockArgs.where,
      include: HomeBlockService.INCLUDE_NESTED
    })
  }

  remove(deleteOneHomeBlockArgs: DeleteOneHomeBlockArgs) {
    return this.prisma.homeBlock.delete({
      where: deleteOneHomeBlockArgs.where,
      include: HomeBlockService.INCLUDE_NESTED
    })
  }
}
