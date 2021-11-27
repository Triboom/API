import { Discount } from '../../domain/entities/discount.entity';
import { DiscountTypeORM } from '../../infrastructure/persistence/typeorm/entities/discount.typeorm';
import { SaleIdForDiscountsTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/sale-id-discount.typeorm';
import { DiscountValueTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/discount-value.typeorm';

export class DiscountMapper {
  public static toTypeORM(discount: Discount): DiscountTypeORM{
    const discountTypeORM: DiscountTypeORM = new DiscountTypeORM();
    discountTypeORM.status = discount.getStatus();
    discountTypeORM.discountValue = DiscountValueTypeORM.from(discount.getDiscount().getValue());
    discountTypeORM.saleId = SaleIdForDiscountsTypeORM.from(discount.getSaleId().getValue());
    return discountTypeORM;
  }
}