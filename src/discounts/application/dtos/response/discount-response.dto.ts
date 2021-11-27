export class DiscountResponseDto {
  constructor(
    public readonly discountId: number,
    public readonly discount: number,
    public readonly saleId: number,
    public readonly status: string,
  ) {
  }
}