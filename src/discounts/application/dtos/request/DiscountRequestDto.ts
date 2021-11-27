export class DiscountRequestDto {
  constructor(
    public readonly saleId: number,
    public readonly discount: number
  ) {
  }
}