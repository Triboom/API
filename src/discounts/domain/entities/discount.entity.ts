import { AggregateRoot } from '@nestjs/cqrs';
import { DiscountId } from '../value-objects/discount-id.value';
import { DiscountStatus } from '../enums/discount.status.enum';
import { DiscountValue } from '../value-objects/discount.value';
import { SaleId } from '../../../sales/domain/value-objects/sale-id.value';
import { ApplyDiscount } from '../events/apply-discount.event';

export class Discount extends AggregateRoot {
  private id: DiscountId;
  private readonly status: DiscountStatus;
  private readonly discount: DiscountValue;
  private readonly saleId: SaleId;

  public constructor(status: DiscountStatus, discount: DiscountValue, saleId: SaleId) {
    super();
    this.status = status;
    this.discount = discount;
    this.saleId = saleId;
  }

  public applyDiscount() {
    const event = new ApplyDiscount(this.id.getValue(), this.saleId.getValue(), this.discount.getValue());
    this.apply(event);
  }

  public getId(): DiscountId {
    return this.id;
  }

  public getStatus(): DiscountStatus {
    return this.status;
  }

  public getDiscount(): DiscountValue {
    return this.discount;
  }

  public getSaleId(): SaleId {
    return this.saleId;
  }

  public changeId(id: DiscountId) {
    this.id = id;
  }
}