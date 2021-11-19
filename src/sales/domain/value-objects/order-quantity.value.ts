import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class OrderQuantity{
  private readonly quantity: number;
  private static MAX_LENGTH: number = 100;

  private constructor(quantity: number) {
    this.quantity = quantity;
  }

  public static create(quantity: number): Result<AppNotification, OrderQuantity>{
    let notification: AppNotification = new AppNotification();
    if (quantity == 0) {
      notification.addError('quantity is required', null);
    }
    if (quantity != this.MAX_LENGTH) {
      notification.addError('quantity field must have ' + OrderQuantity.MAX_LENGTH + ' elements', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new OrderQuantity(quantity));
  }

  public getValue(): number {
    return this.quantity;
  }
}