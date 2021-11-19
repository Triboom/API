import * as moment from 'moment-timezone';
import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class DateTime {
  private datetime: Date;

  private constructor(
    datetime: Date
  ) {
    this.datetime = datetime;
  }

  public static from(datetime: Date) {
    return new DateTime(
      datetime
    );
  }

  public static utcNow() {
    moment.tz.setDefault('UTC');
    const datetime = moment.tz().toDate();
    //moment.tz().format();
    return new DateTime(
      datetime
    );
  }

  public static create(date: Date): Result<AppNotification, DateTime>{
    let notification: AppNotification = new AppNotification();
    if (date == null) {
      notification.addError('date is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new DateTime(date));
  }

  public getValue(): Date{
    return this.datetime;
  }
}