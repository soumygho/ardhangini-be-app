import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { ProductInventoryUpdateDto } from '../dto/product-inventory-update.dto';
import { ProductInventoryResponseDto } from '../dto/product-inventory-response.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { OrderDetailsEntity } from 'src/product/order/entities/order.entity';
import { SareeEntity } from 'src/product/product-details';
import { TransactionType } from '../enum/transaction-type.enum';
import { ProductInventoryEntity } from '../entity/product-inventory.entity';
import { InventoryResponseMapper } from '../mapper/inventory.mapper';

export class InventoryCreateTransaction extends BaseTransaction<
  ProductInventoryUpdateDto,
  ProductInventoryResponseDto
> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly mapper: InventoryResponseMapper,
  ) {
    super(dataSource);
  }
  protected async execute(
    data: ProductInventoryUpdateDto,
    manager: EntityManager,
  ): Promise<ProductInventoryResponseDto> {
    const productTypeRepository: Repository<ProductTypeEntity> =
      manager.getRepository(ProductTypeEntity);
    const userRepository: Repository<UserEntity> =
      manager.getRepository(UserEntity);
    const productTypeEntity: ProductTypeEntity =
      await productTypeRepository.findOneBy({ id: data.productTypeId });
    const inventoryRepository: Repository<ProductInventoryEntity> =
      manager.getRepository(ProductInventoryEntity);
    const userEntity: UserEntity = await userRepository.findOneBy({
      id: data.userId,
    });
    if (!productTypeEntity) {
      throw new NotFoundException('ProductType not found');
    }

    let orderDetails: OrderDetailsEntity;
    if (data.orderId) {
      const orderRepository: Repository<OrderDetailsEntity> =
        manager.getRepository(OrderDetailsEntity);
      orderDetails = await orderRepository.findOneBy({
        id: data.orderId,
      });
      if (!orderDetails) {
        throw new NotFoundException('Order not found.');
      }
    }

    if (orderDetails && !userEntity) {
      throw new NotFoundException('User not found');
    }

    if (productTypeEntity.name.toLowerCase() === ProductTypes.SAREE) {
      const sareeRepository: Repository<SareeEntity> =
        manager.getRepository(SareeEntity);
      let sareeEntity: SareeEntity = await sareeRepository
        .createQueryBuilder('saree')
        .useTransaction(true)
        .setLock('pessimistic_write')
        .where('id = :id', { id: data.productId })
        .getOne();
      if (!sareeEntity) {
        throw new NotFoundException('Saree not found.');
      }
      const openingQuantity = sareeEntity.available_qty;
      if (data.transactionType === TransactionType.CREDIT) {
        sareeEntity.available_qty = sareeEntity.available_qty + data.quantity;
      } else {
        if (data.quantity > sareeEntity.available_qty) {
          throw new BadRequestException(
            'Quantity is greater than available quantity.',
          );
        }
        sareeEntity.available_qty = sareeEntity.available_qty - data.quantity;
      }
      //for non order transactions need to read admin user from admin user table
      let inventoryTransactionEntity: ProductInventoryEntity =
        inventoryRepository.create();
      inventoryTransactionEntity.opening = openingQuantity;
      inventoryTransactionEntity.description = data.description;
      inventoryTransactionEntity.invoiceref = data.invoiceRef;
      inventoryTransactionEntity.owner = userEntity;
      inventoryTransactionEntity.productId = sareeEntity.id;
      inventoryTransactionEntity.productType = productTypeEntity;
      inventoryTransactionEntity.quantity = data.quantity;
      inventoryTransactionEntity.transactionType = data.transactionType;
      inventoryTransactionEntity.closing = sareeEntity.available_qty;
      if (orderDetails) {
        inventoryTransactionEntity.order = orderDetails;
      }
      inventoryTransactionEntity = await inventoryRepository.save(
        inventoryTransactionEntity,
      );
      sareeEntity = await sareeRepository.save(sareeEntity);
      return this.mapper.convertToInventoryResponse(inventoryTransactionEntity);
    }
  }
}
