export class DiscountRequestDto {
  constructor(
    public readonly saleId: string,
    public readonly discount: number
  ) {
  }
}