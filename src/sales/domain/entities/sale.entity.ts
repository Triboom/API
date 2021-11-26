import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerId } from '../../../customers/domain/value-objects/customer-id.value';
import { ProductId } from '../../../products/domain/value-objects/product-id.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SaleId } from '../value-objects/sale-id.value';
import { OrderQuantity } from '../value-objects/order-quantity.value';
import { OrderStatus } from '../value-objects/order-status.value';
import { SaleRegistered } from '../events/sale-registered.event';
import { Money } from "../../../common/domain/value-objects/money.value";
import { Product } from 'src/products/domain/entities/product.entity';
import { Any } from 'typeorm';
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Sale extends AggregateRoot{
  private id: SaleId;
  private customerId: CustomerId;
  private productId: ProductId;
  private orderQuantity: OrderQuantity;
  private orderStatus: OrderStatus;
  private price: Money;

  constructor(orderQuantity: OrderQuantity, orderStatus: OrderStatus, customerId: CustomerId, productId: ProductId, price: Money) {
    super();
    this.orderQuantity = orderQuantity;
    this.orderStatus = orderStatus;
    this.productId = productId;
    this.customerId = customerId;
    this.price = price;
  }

  public register() {
    const event = new SaleRegistered(this.id.getValue(), this.orderQuantity.getValue(), this.orderStatus.getValue(), this.customerId.getValue(), this.productId.getValue(), String(this.price.getAmount()));
    this.apply(event);
  }


  
  private calcPrice(){
    // ammount = Product by ID .getPrice() * this.orderQuantity
    // currency = Product by ID .getCurrency();
    // this.price = new Money(ammount, currency);
    console.log("First we need to have a unit price of product")
  }

  public getId(): SaleId {
    return this.id;
  }

  public getOrderQuantity(): OrderQuantity {
    return this.orderQuantity;
  }

  public getOrderStatus(): OrderStatus {
    return this.orderStatus;
  }

  public changeId(id: SaleId) {
    this.id = id;
  }

  public getCustomerId(): CustomerId {
    return this.customerId;
  }

  public getProductId(): ProductId {

    return this.productId;
  }

  public getPrice(): Money {
    return this.price;
  }

  public changeOrderQuantity(orderQuantity: OrderQuantity): void {
    this.orderQuantity = orderQuantity;
  }

  public changeOrderStatus(orderStatus: OrderStatus): void {
    this.orderStatus = orderStatus;
  }

  public changePrice(price: Money): void {
    this.price = price;
  }
}
