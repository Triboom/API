import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class Money {
  private readonly amount: number;
  private readonly currency: string;

  private constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  public static create(amount: number, currency: string): Result<AppNotification, Money> {
    let notification: AppNotification = new AppNotification();
    currency = (currency ?? "").trim();
    if (currency === "") {
      notification.addError('amount is required', null);
    }
    if(amount < 0){
      notification.addError("Invalid amount",null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Money(amount,currency));
  }

  public add(other: Money): Money {
    return this.newMoney(this.amount + other.getAmount());
  }

  public subtract(other: Money): Money {
    return this.newMoney(this.amount - other.getAmount());
  }

  private newMoney(amount: number): Money {
    return new Money(amount, this.currency);
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCurrency(): string {
    return this.currency;
  }
}
