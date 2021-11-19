import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class ProductId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<AppNotification, ProductId> {
    let notification: AppNotification = new AppNotification();
    if (value == null) {
      notification.addError('product id is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ProductId(value));
  }

  public static createProduct(value: number){
    return new ProductId(value);
  }

  public getValue(): number {
    return this.value;
  }
}