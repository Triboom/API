import { AggregateRoot } from "@nestjs/cqrs";
import { DeliveryId } from "../value-objects/delivery-id.value";
import { SaleId } from "../../../sales/domain/value-objects/sale-id.value";
import { Address } from "../../../common/domain/value-objects/address.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { DeliveryStatus } from "../value-objects/delivery-status.value";
import { DeliveryRegisteredEvent } from "../events/delivery-registered.event";

export class Delivery extends AggregateRoot {
  private id: DeliveryId;
  private readonly saleId: SaleId;
  private readonly address: Address;
  private readonly estimatedDeliveryDate: DateTime;
  private readonly deliveryDate: DateTime;
  private readonly deliveryStatus: DeliveryStatus;

  public constructor(saleId: SaleId, address: Address, estimatedDate: DateTime, deliveryDate: DateTime, deliveryStatus: DeliveryStatus) {
    super();
    this.saleId = saleId;
    this.address = address;
    this.estimatedDeliveryDate = estimatedDate;
    this.deliveryDate = deliveryDate;
    this.deliveryStatus = deliveryStatus;
  }

  public register(){
    const event = new DeliveryRegisteredEvent(this.id.getValue(), this.saleId.getValue(),this.address,this.estimatedDeliveryDate.getValue(),this.deliveryDate.getValue(),this.deliveryStatus.getValue());
  }

  public getId() {
    return this.id;
  }

  public getSaleId(){
    return this.saleId;
  }
  public getAddress(){
    return this.address.getAddress();
  }

  public getDistrict(){
    return this.address.getDistrict();
  }

  public getStatus() {
    return this.deliveryStatus;
  }

  public getEstimatedDate() {
    return this.estimatedDeliveryDate;
  }

  public getDeliveryDate(){
    return this.deliveryDate;
  }

  public changeId(id: DeliveryId) {
    this.id = id;
  }
}
