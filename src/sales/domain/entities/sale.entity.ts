import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value';
import { ProductId } from '../../../products/domain/value-objects/product-id.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SaleId } from '../value-objects/sale-id.value';
import { OrderQuantity } from '../value-objects/order-quantity.value';
import { OrderStatus } from '../value-objects/order-status.value';
import { SaleRegistered } from '../events/sale-registered.event';

export class Sale extends AggregateRoot{
  private id: SaleId;
  private customerId: CustomerId;
  private productIds: ProductId[];
  private orderQuantity: OrderQuantity;
  private dateTime: DateTime;
  private orderStatus: OrderStatus;

  constructor(id: SaleId, orderQuantity: OrderQuantity, dateTime: DateTime, orderStatus: OrderStatus) {
    super();
    this.id = id;
    this.orderQuantity = orderQuantity;
    this.dateTime = dateTime;
    this.orderStatus = orderStatus;
    this.productIds = [];
    this.customerId = Object();
  }

  public register() {
    const event = new SaleRegistered(this.id.getValue(), this.orderQuantity.getValue(), this.dateTime.getValue(), this.orderStatus.getValue());
    this.apply(event);
  }

  public getId(): SaleId {
    return this.id;
  }

  public getOrderQuantity(): OrderQuantity {
    return this.orderQuantity;
  }

  public getDateTime(): DateTime {
    return this.dateTime;
  }
  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public changeId(id: SaleId) {
    this.id = id;
  }

  public changeOrderQuantity(orderQuantity: OrderQuantity): void {
    this.orderQuantity = orderQuantity;
  }

  public changeDateTime(dateTime: DateTime): void {
    this.dateTime = dateTime;
  }

  public changeOrderStatus(orderStatus: OrderStatus): void {
    this.orderStatus = orderStatus;
  }
}