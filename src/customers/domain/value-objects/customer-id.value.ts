import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class CustomerId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<AppNotification, CustomerId>{
    let notification: AppNotification = new AppNotification();
    if (value == null) {
      notification.addError('customer id is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new CustomerId(value));
  }
  public static createCustomer(value: number){
    return new CustomerId(value);
  }

  public getValue(): number {
    return this.value;
  }

  public static of(value: number): CustomerId {
    return new CustomerId(value);
  }
}