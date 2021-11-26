import { OrderQuantity } from '../value-objects/order-quantity.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { OrderStatus } from '../value-objects/order-status.value';
import { Sale } from '../entities/sale.entity';
import { SaleId } from '../value-objects/sale-id.value';
import { ProductId } from 'src/products/domain/value-objects/product-id.value';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';

export class SaleFactory {
  public static createFrom(orderQuantity: OrderQuantity, orderStatus: OrderStatus, customerId: CustomerId, productId: ProductId , price:Money): Sale {
    return new Sale(orderQuantity, orderStatus, customerId, productId, price);
  }
}