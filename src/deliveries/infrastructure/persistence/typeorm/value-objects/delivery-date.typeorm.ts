import { Column } from "typeorm";
import { DateTime } from "../../../../../common/domain/value-objects/date-time.value";

export class DeliveryDateTypeorm {
  @Column('date', {name: 'delivery_date', nullable: false})
  public value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: DateTime): DeliveryDateTypeorm {
    return new DeliveryDateTypeorm (value);
  }
}