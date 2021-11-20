import { Address } from "../../../common/domain/value-objects/address.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { DeliveryStatus } from "../value-objects/delivery-status.value";

export class DeliveryRegisteredEvent {
  constructor(
    public readonly id: number,
    public readonly saleId: number,
    public readonly address: Address,
    public readonly estimatedDeliveryDate: Date,
    public readonly deliveryDate: Date,
    public readonly deliveryStatus: number
  ) {}
}