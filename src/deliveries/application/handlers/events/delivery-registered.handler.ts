import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { IEventHandler } from '@nestjs/cqrs';
import { DeliveryRegisteredEvent } from "../../../domain/events/delivery-registered.event";

@EventsHandler(DeliveryRegisteredEvent)
export class DeliveryRegisteredHandler implements IEventHandler<DeliveryRegisteredEvent> {
  constructor() {}

  handle(event: DeliveryRegisteredEvent) {
    console.log('handle logic for DeliveryRegistered');
    console.log(event);
  }
}