import { OrderQuantity } from '../value-objects/order-quantity.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { OrderStatus } from '../value-objects/order-status.value';
import { Sale } from '../entities/sale.entity';
import { SaleId } from '../value-objects/sale-id.value';

export class SaleFactory {
  public static createFrom(orderQuantity: OrderQuantity, dateTime: DateTime, orderStatus: OrderStatus): Sale {
    return new Sale(SaleId.create(0), orderQuantity, dateTime, orderStatus);
  }

  public static withId(saleId: SaleId, orderQuantity: OrderQuantity, dateTime: DateTime, orderStatus: OrderStatus): Sale {
    return new Sale(saleId, orderQuantity, dateTime, orderStatus);
  }
}