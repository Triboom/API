export class RegisterSaleCommand {
  constructor(
    public readonly orderQuantity: number,
    public readonly dateTime: Date,
    public readonly orderStatus: boolean,
  ) {}
}