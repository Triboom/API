export class GetDeliveriesDto{
  public id: number;
  public saleId: number;
  public address: string;
  public district: string;
  public estimatedDeliveryDate: Date;
  public deliveryDate: Date;
  public deliveryStatus: number;
}