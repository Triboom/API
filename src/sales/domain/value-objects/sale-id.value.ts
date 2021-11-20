import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class SaleId{
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): Result<AppNotification, SaleId>{
    let notification: AppNotification = new AppNotification();
    if (value == null) {
      notification.addError('sale id is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new SaleId(value));
  }

  public getValue(): number {
    return this.value;
  }
}