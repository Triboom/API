import { OrderQuantity } from '../value-objects/order-quantity.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { OrderStatus } from '../value-objects/order-status.value';

export class SaleRegistered {
  constructor(
    public readonly id: number,
    public readonly orderQuantity: number,
    public readonly dateTime: Date,
    public readonly orderStatus: boolean,
  ) {
  }
}