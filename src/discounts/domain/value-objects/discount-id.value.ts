import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class DiscountId{
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<AppNotification, DiscountId>{
    let notification: AppNotification = new AppNotification();
    if (value == null) {
      notification.addError('discount id is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DiscountId(value));
  }

  public static createSale(value: number) {
    return new DiscountId(value);
  }

  public getValue(): number {
    return this.value;
  }

  public static of(value: number): DiscountId {
    return new DiscountId(value);
  }
}