export class ApplyDiscount {
  constructor(
    public readonly discountId : number,
    private readonly saleId : number,
    private readonly discount : number,
  ) {
  }
}