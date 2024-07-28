import { BaseTransaction } from 'src/common/entity/BaseTransaction';
import { CreateProductDto } from '../dto';
import { CreateProductResponseDto } from '../dto/create-product-response.dto';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ProductTypeEntity } from 'src/product/product-type/entities/product-type.entity';
import { ManufacturerEntity } from 'src/product/manufacturer/entities/manufacturer.entity';
import { CategoryEntity } from 'src/product/category/entities/category.entity';
import { SubcategoryEntity } from 'src/product/subcategory/entities/subcategory.entity';
import {
  FabricDetailsEntity,
  SareeDetailsEntity,
  SareeEntity,
} from '../entities';
import { ProductTypes } from 'src/product/product-type/enum/product-type.enum';

@Injectable()
export class RegisterOrUpdateProductTransaction extends BaseTransaction<
  CreateProductDto,
  CreateProductResponseDto
> {
  constructor(private readonly dataSource: DataSource) {
    super(dataSource);
  }
  protected async execute(
    data: CreateProductDto,
    manager: EntityManager,
  ): Promise<CreateProductResponseDto> {
    const productTypeRepository: Repository<ProductTypeEntity> =
      await manager.getRepository(ProductTypeEntity);
    const manufacturerRepository: Repository<ManufacturerEntity> =
      await manager.getRepository(ManufacturerEntity);
    const categoryRepository: Repository<CategoryEntity> =
      await manager.getRepository(CategoryEntity);
    const subCategoryRepository: Repository<SubcategoryEntity> =
      await manager.getRepository(SubcategoryEntity);
    const productType: ProductTypeEntity =
      await productTypeRepository.findOneBy({ id: data.productTypeId });
    if (productType.name.toLowerCase() === ProductTypes.SAREE) {
      const fabricRepository: Repository<FabricDetailsEntity> =
        await manager.getRepository(FabricDetailsEntity);
      const sareeRepository: Repository<SareeEntity> =
        await manager.getRepository(SareeEntity);
      const sareeDetailsRepository: Repository<SareeDetailsEntity> =
        await manager.getRepository(SareeDetailsEntity);

      const category: CategoryEntity = await categoryRepository.findOneBy({
        id: data.categoryId,
      });
      const subCategory: SubcategoryEntity =
        await subCategoryRepository.findOneBy({ id: data.subCategoryId });
      const manufacturer: ManufacturerEntity =
        await manufacturerRepository.findOneBy({ id: data.manufacturerId });
      const fabricDetails: FabricDetailsEntity =
        await fabricRepository.findOneBy({
          id: data.productDetails.fabricDetailsId,
        });
      let sareeEntity: SareeEntity = await sareeRepository.create();
      let sareeDetailsEntity: SareeDetailsEntity =
        await sareeDetailsRepository.create();
      sareeEntity.actualprice = data.actualprice;
      sareeEntity.available_qty = 0;
      sareeEntity.averageReview = 0;
      sareeEntity.isActive = data.isActive;
      sareeEntity.numberOfReviews = 0;
      sareeEntity.offerprice = data.offerprice;
      sareeEntity.productDescription = data.productDescription;
      sareeEntity.productName = data.productName;
      sareeEntity.returnExchangePolicy = data.returnExchangePolicy;
      sareeEntity.cgst = data.cgst;
      sareeEntity.sgst = data.sgst;
      sareeEntity.maxQuantityPerCart = data.maxQuantityPerCart;
      sareeDetailsEntity.blouse_desc = data.productDetails.blouseDescription;
      sareeDetailsEntity.blousePieceIncluded =
        data.productDetails.isBlousePieceIncluded;
      sareeDetailsEntity.length = data.productDetails.length;
      sareeDetailsEntity.width = data.productDetails.width;
      sareeEntity.category = category;
      sareeEntity.manufacturer = manufacturer;
      sareeEntity.productType = productType;
      sareeEntity.subCategory = subCategory;
      sareeEntity.skuid = data.skuid;
      sareeDetailsEntity.fabricDetails = fabricDetails;
      if (
        (await sareeRepository.existsBy({ productName: data.productName })) ||
        (data.productId &&
          (await sareeRepository.existsBy({ id: data.productId })))
      ) {
        //update product
        let currentSareeEntity: SareeEntity;
        if (data.productId) {
          currentSareeEntity = await sareeRepository.findOneBy({
            id: data.productId,
          });
        } else {
          currentSareeEntity = await sareeRepository.findOneBy({
            productName: data.productName,
          });
        }
        if (currentSareeEntity) {
          sareeEntity.available_qty = currentSareeEntity.available_qty;
          sareeEntity.id = currentSareeEntity.id;
          sareeEntity.averageReview = currentSareeEntity.averageReview;
          sareeEntity.numberOfReviews = currentSareeEntity.numberOfReviews;
          const currentSareeDetailsEntity: SareeDetailsEntity =
            await sareeDetailsRepository.findOneBy({
              id: currentSareeEntity.sareeDetails.id,
            });
          sareeDetailsEntity.id = currentSareeDetailsEntity.id;
          sareeDetailsEntity.product = currentSareeDetailsEntity.product;
          sareeEntity.productImages = currentSareeEntity.productImages;
          sareeEntity.isBestSeller = currentSareeEntity.isBestSeller;
          sareeEntity.isNew = currentSareeEntity.isNew;
          sareeEntity.isTrending = currentSareeEntity.isTrending;
          console.trace(JSON.stringify(sareeEntity));
          console.trace(JSON.stringify(sareeDetailsEntity));
          sareeDetailsEntity =
            await sareeDetailsRepository.save(sareeDetailsEntity);
          sareeEntity.sareeDetails = sareeDetailsEntity;
          sareeEntity = await sareeRepository.save(sareeEntity);
        } else {
          console.error('no saree entity found');
        }
      } else {
        //create product
        sareeEntity = await sareeRepository.save(sareeEntity);
        //sareeDetailsEntity.sareeId = sareeEntity.id;
        sareeDetailsEntity.product = sareeEntity;
        sareeEntity.isActive = true;
        sareeDetailsEntity =
          await sareeDetailsRepository.save(sareeDetailsEntity);
        sareeEntity.sareeDetails = sareeDetailsEntity;
        sareeEntity = await sareeRepository.save(sareeEntity);
      }
      data.productId = sareeEntity.id;
      const response: CreateProductResponseDto = new CreateProductResponseDto();
      Object.assign(response, data);
      response.averageReview = sareeEntity.averageReview;
      response.availableQuantity = sareeEntity.available_qty;
      response.numberOfReviews = sareeEntity.numberOfReviews;
      response.actualprice = sareeEntity.actualprice;
      response.offerPrice = sareeEntity.offerprice;
      response.discountPercentage =
        ((sareeEntity.actualprice - sareeEntity.offerprice) /
          sareeEntity.actualprice) *
        100;
      response.isBestSeller = sareeEntity.isBestSeller;
      console.log(JSON.stringify(response));
      return response;
    }
  }
}
