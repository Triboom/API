export class RegisterSaleResponseDto {
  constructor(
    public id: number,
    public readonly orderQuantity: number,
    public readonly orderStatus: boolean,
    public readonly customerId: number,
    public readonly productId: number,
    public readonly price: number
  ) {}
}
