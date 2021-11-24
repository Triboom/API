import { OrderQuantity } from '../value-objects/order-quantity.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { OrderStatus } from '../value-objects/order-status.value';
import { Sale } from '../entities/sale.entity';
import { SaleId } from '../value-objects/sale-id.value';
import { ProductId } from 'src/products/domain/value-objects/product-id.value';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.value';

export class SaleFactory {
  public static createFrom(orderQuantity: OrderQuantity, dateTime: DateTime, orderStatus: OrderStatus, customerId: CustomerId, productId: ProductId ): Sale {
    return new Sale(orderQuantity, dateTime, orderStatus, customerId, productId);
  }
}