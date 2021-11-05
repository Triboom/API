import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class ProductName{
  private readonly productName: string;
  private static MAX_LENGTH: number = 75;

  private constructor(productName: string) {
    this.productName = productName;
  }

  public getProductName(): string {
    return this.productName;
  }


  public static create(productName: string): Result<AppNotification, ProductName> {
    let notification: AppNotification = new AppNotification();
    productName = (productName ?? "").trim();
    if (productName === "") {
      notification.addError('product name is required', null);
    }
    if (productName.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an product name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ProductName(productName));
  }
}
