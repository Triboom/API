import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ApplyDiscount } from '../../../domain/events/apply-discount.event';

@EventsHandler(ApplyDiscount)
export class ApplyDiscountedHandler implements IEventHandler<ApplyDiscount> {
  constructor(
  ) {}

  async handle(event: ApplyDiscount) {
    console.log('Discount Triboom - handle ApplyDiscounted');
  }
}