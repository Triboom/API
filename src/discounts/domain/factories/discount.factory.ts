import { Discount } from '../entities/discount.entity';
import { DiscountStatus } from '../enums/discount.status.enum';
import { DiscountValue } from '../value-objects/discount.value';
import { SaleId } from '../../../sales/domain/value-objects/sale-id.value';

export class DiscountFactory {
  public static createFrom(
    status: DiscountStatus, discount: DiscountValue, saleId: SaleId): Discount {
    return new Discount(status, discount, saleId);
  }
}