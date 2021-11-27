import { DiscountStatus } from '../enums/discount.status.enum';

export class ApplyDiscount {
  constructor(
    public readonly discountId : number,
    public readonly saleId : number,
    public readonly discount : number,
    public readonly status: DiscountStatus
  ) {
  }
}