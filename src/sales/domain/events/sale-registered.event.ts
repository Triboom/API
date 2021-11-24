export class SaleRegistered {
  constructor(
    public readonly id: number,
    public readonly orderQuantity: number,
    public readonly dateTime: Date,
    public readonly orderStatus: boolean,
    public readonly productId: number,
    public readonly customerId: number,
    public readonly price: number,
  ) {
  }
}