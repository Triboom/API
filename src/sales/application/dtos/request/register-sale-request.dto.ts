
export class RegisterSaleRequestDto {
  constructor(
    public readonly orderQuantity: number,
    public readonly dateTime: Date,
    public readonly orderStatus: boolean,
    public readonly customerId: number,
    public readonly productId: number,
    public readonly price: number
  ) {}
}
