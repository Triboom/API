import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { SaleRegistered } from '../../../domain/events/sale-registered.event';
import { IEventHandler } from '@nestjs/cqrs';

@EventsHandler(SaleRegistered)
export class SaleRegisteredHandler implements IEventHandler<SaleRegistered> {
  constructor() {}

  handle(event: SaleRegistered) {
    console.log('handle logic for SaleRegistered');
    console.log(event);
  }
}