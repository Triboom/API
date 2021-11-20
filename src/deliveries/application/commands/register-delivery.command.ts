export class RegisterDeliveryCommand{
  constructor(
    public readonly saleId: number,
    public readonly address: string,
    public readonly district: string,
    public readonly estimatedDeliveryDate: Date,
  ) {}
}