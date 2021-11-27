import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class DiscountValue{
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  /*
  public static create(value: number): Result<AppNotification, DiscountValue>{
    let notification: AppNotification = new AppNotification();
    if (value == null) {
      notification.addError('discount value is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DiscountValue(value));
  }
  */

  public static create(amount: number): DiscountValue {
    return new DiscountValue(
      amount
    );
  }

  public getValue(): number {
    return this.value;
  }
}