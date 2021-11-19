
export class RegisterSaleResponseDto {
  constructor(
    public id: number,
    public readonly orderQuantity: number,
    public readonly dateTime: Date,
    public readonly orderStatus: boolean,
  ) {}
}
