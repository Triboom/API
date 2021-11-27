import { DiscountStatus } from '../../domain/enums/discount.status.enum';


export class DiscountMoney {
  constructor(
    public readonly saleId: string,
    public readonly discount: number,
    public readonly status: DiscountStatus,
  ) {}
}