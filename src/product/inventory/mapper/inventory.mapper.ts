import { DataSource, Repository } from 'typeorm';
import { ProductInventoryEntity } from '../entity/product-inventory.entity';
import { ProductInventoryResponseDto } from '../dto/product-inventory-response.dto';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';
import { SareeEntity } from 'src/product/product-details';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryResponseMapper {
  constructor(private readonly dataSource: DataSource) {}

  public async convertToInventoryResponse(
    transactionEntity: ProductInventoryEntity,
  ): Promise<ProductInventoryResponseDto> {
    const response: ProductInventoryResponseDto =
      new ProductInventoryResponseDto();
    if (
      transactionEntity.productType.name.toLowerCase() === ProductTypes.SAREE
    ) {
      const productRepository: Repository<SareeEntity> =
        this.dataSource.getRepository(SareeEntity);
      const sareeEntity: SareeEntity = await productRepository.findOneBy({
        id: transactionEntity.productId,
      });
      response.productTypeId = transactionEntity.productType.id;
      response.productTypeName = transactionEntity.productType.name;
      response.productName = sareeEntity.productName;
      response.productThumbNail = sareeEntity.productImages[0].thumbnailSource;
      response.productId = sareeEntity.id;
      response.transactionId = transactionEntity.id;
      response.userEmail = transactionEntity.owner.email;
      response.userId = transactionEntity.owner.id;
      response.userMobile = transactionEntity.owner.mobile;
      response.quantity = transactionEntity.quantity;
      response.transactionType = transactionEntity.transactionType;
      response.transactionDate = transactionEntity.createdAt;
    }
    return response;
  }
}
