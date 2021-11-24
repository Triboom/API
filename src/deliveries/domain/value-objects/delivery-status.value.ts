import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class DeliveryStatus{
  private value: number;

  private constructor(status: number) {
    this.value = status;
  }

  public static create(status: number): Result<AppNotification, DeliveryStatus> {
    let notification: AppNotification = new AppNotification();
    if (status > 3) {
      notification.addError('invalid value', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DeliveryStatus(status));
  }

  public getValue(): number {
    return this.value;
  }
}
