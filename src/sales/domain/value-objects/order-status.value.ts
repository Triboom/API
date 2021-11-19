import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class OrderStatus{
  private readonly status: boolean;

  private constructor(status: boolean) {
    this.status = status;
  }

  public static create(status: boolean): Result<AppNotification, OrderStatus> {
    let notification: AppNotification = new AppNotification();
    if (status == null) {
      notification.addError('status is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new OrderStatus(status));
  }

  public getValue(): boolean {
    return this.status;
  }
}