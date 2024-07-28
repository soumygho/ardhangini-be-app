import { Between, DataSource, FindOptionsWhere } from 'typeorm';
import { InventoryCreateTransaction } from '../transactions/inventory.transaction';
import { ProductInventoryUpdateDto } from '../dto/product-inventory-update.dto';
import {
  InventoryTransactionFilter,
  InventoryTransactionFilterType,
} from '../dto/transaction-filter.dto';
import { ProductInventoryEntity } from '../entity/product-inventory.entity';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { SareeEntity } from '../../product-details/entities/saree/saree.entity';
import { NotFoundException } from '@nestjs/common';
import { InventoryResponseMapper } from '../mapper/inventory.mapper';

export class ProductInventoryService {
  constructor(
    private readonly datasource: DataSource,
    private readonly transaction: InventoryCreateTransaction,
    private readonly mapper: InventoryResponseMapper,
  ) {}

  async createTransaction(dto: ProductInventoryUpdateDto) {
    return await this.transaction.run(dto);
  }

  async getTransactionByFilter(filterDto: InventoryTransactionFilter) {
    let findOptions: FindOptionsWhere<ProductInventoryEntity> = {};
    if (filterDto.filterType === InventoryTransactionFilterType.BYDATE) {
      findOptions = {
        ...findOptions,
        createdAt: Between(filterDto.startDate, filterDto.endDate),
      };
    } else if (
      filterDto.filterType === InventoryTransactionFilterType.BYORDER
    ) {
      const orderDetails: OrderDetailsEntity = await this.datasource
        .getRepository(OrderDetailsEntity)
        .findOneBy({ id: filterDto.orderId });
      if (orderDetails) {
        findOptions = { ...findOptions, order: orderDetails };
      } else {
        throw new NotFoundException('Order not found!');
      }
    } else if (
      filterDto.filterType === InventoryTransactionFilterType.BYPRODUCT
    ) {
      const sareeEntity: SareeEntity = await this.datasource
        .getRepository(SareeEntity)
        .findOneBy({ id: filterDto.productId });
      if (sareeEntity) {
        findOptions = { ...findOptions, productId: sareeEntity.id };
      } else {
        throw new NotFoundException('Product not found!');
      }
    }

    return (
      await this.datasource
        .getRepository(ProductInventoryEntity)
        .findBy(findOptions)
    ).map((transaction) => this.mapper.convertToInventoryResponse(transaction));
  }
}
