import { ProductRegisteredEvent } from "src/products/domain/events/product-registered.event";
import { IEventHandler } from "@nestjs/cqrs";
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(ProductRegisteredEvent)
export class ProductRegisteredHandler implements IEventHandler<ProductRegisteredEvent> {
    constructor() {}

    handle(event: ProductRegisteredEvent) {
        console.log('handle logic for ProductRegisteredEvent');
        console.log(event);
    }
}