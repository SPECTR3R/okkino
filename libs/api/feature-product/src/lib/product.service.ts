import { Injectable } from '@nestjs/common'
import { PrismaService } from '@okkino/api/data-access-db'
import {
  CreateOneProductArgs,
  DeleteOneHomeBlockArgs,
  FindUniqueProductArgs,
  UpdateOneProductArgs
} from '@okkino/api/generated-db-types'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  private static readonly INCLUDE_NESTED: Prisma.ProductInclude = {
    images: {
      include: {
        rgbBackground: true
      }
    },
    availableColors: true
  }

  create(createOneProductArgs: CreateOneProductArgs) {
    return this.prisma.product.create({
      data: createOneProductArgs.data,
      include: ProductService.INCLUDE_NESTED
    })
  }

  findAll() {
    return this.prisma.product.findMany({ include: ProductService.INCLUDE_NESTED })
  }

  findOne(findUniqueProductArgs: FindUniqueProductArgs) {
    return this.prisma.product.findUnique({
      where: findUniqueProductArgs.where,
      include: ProductService.INCLUDE_NESTED
    })
  }

  update(updateOneProductArgs: UpdateOneProductArgs) {
    return this.prisma.product.update({
      data: updateOneProductArgs.data,
      where: updateOneProductArgs.where,
      include: ProductService.INCLUDE_NESTED
    })
  }

  remove(deleteOneHomeBlockArgs: DeleteOneHomeBlockArgs) {
    return this.prisma.product.delete({
      where: deleteOneHomeBlockArgs.where,
      include: ProductService.INCLUDE_NESTED
    })
  }
}
