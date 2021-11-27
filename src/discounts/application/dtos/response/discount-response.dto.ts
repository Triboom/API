export class DiscountResponseDto {
  constructor(
    public readonly discountId: number,
    public readonly discount: number,
    public readonly saleId: string,
    public readonly status: string,
  ) {
  }
}