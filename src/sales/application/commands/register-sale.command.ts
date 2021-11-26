export class RegisterSaleCommand {
  constructor(
    public readonly orderQuantity: number,
    public readonly orderStatus: boolean,
    public readonly customerId: number,
    public readonly productId: number,
    public readonly price: string
  ) {}
}