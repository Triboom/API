import { AggregateRoot } from "@nestjs/cqrs";
import { ProductId } from "../value-objects/product-id.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { ProductName } from "../value-objects/product-name.value";
import { ProductRegisteredEvent } from "../events/product-registered.event";

export class Product extends AggregateRoot{
  private id: ProductId;
  private name: ProductName;
  private price: Money;

  constructor(name: ProductName, price: Money ) {
    super();
    this.name = name;
    this.price = price;
  }

  public register() {
    const event = new ProductRegisteredEvent(this.id.getValue(), this.name.getProductName(), String(this.price.getAmount()));
    this.apply(event);
  }

  public getId(): ProductId {
    return this.id;
  }

  public getName(): ProductName {
    return this.name;
  }

  public changeId(id: ProductId) {
    this.id = id;
  }

  public changeName(name: ProductName): void {
    this.name = name;
  }

  public getPrice(){
    return this.price;
  }

}