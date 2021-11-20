import { Column } from "typeorm";
import { DateTime } from "../../../../../common/domain/value-objects/date-time.value";

export class EstimatedDeliveryDateTypeorm {
  @Column('date', {name: 'estimated_delivery_date', nullable: false})
  public value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): EstimatedDeliveryDateTypeorm {
    return new EstimatedDeliveryDateTypeorm (value);
  }
}