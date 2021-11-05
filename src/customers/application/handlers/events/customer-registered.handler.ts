import { CustomerRegisteredEvent } from '../../../domain/events/customer-registered.event';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(CustomerRegisteredEvent)
export class CustomerRegisteredHandler implements IEventHandler<CustomerRegisteredEvent> {
  constructor() {}

  handle(event: CustomerRegisteredEvent) {
    console.log('handle logic for CustomerRegisteredEvent');
    console.log(event);
  }
}