import { DiscountStatus } from '../../domain/enums/discount.status.enum';


export class DiscountMoney {
  constructor(
    public readonly saleId: number,
    public readonly discount: number,
    public readonly status: DiscountStatus,
  ) {}
}