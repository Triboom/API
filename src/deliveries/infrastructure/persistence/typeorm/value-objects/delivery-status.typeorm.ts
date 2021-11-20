import { Column } from "typeorm";
import { DeliveryStatus } from "../../../../domain/value-objects/delivery-status.value";

export class DeliveryStatusTypeorm{
  @Column('tinyint', {name: 'delivery_status', nullable: true})
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): DeliveryStatusTypeorm {
    return new DeliveryStatusTypeorm(value);
  }
}