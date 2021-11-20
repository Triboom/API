export class RegisterDeliveryResponseDto{
  constructor(
    public readonly deliveryId: number,
    public readonly saleId: number,
    public readonly address: string,
    public readonly district: string,
    public readonly estimatedDeliveryDate: Date,
    public readonly deliveryDate: Date,
    public readonly deliveryStatus: number
  ) {}
}