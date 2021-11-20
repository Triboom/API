import { RegisterDeliveryHandler } from "./application/handlers/commands/register-delivery.handler";
import { GetDeliveriesHandler } from "./application/handlers/queries/get-deliveries.handler";
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeliveryTypeorm } from "./infrastructure/persistence/typeorm/entities/delivery.typeorm";
import { DeliveriesController } from "./api/deliveries.controller";
import { DeliveryRegisteredHandler } from "./application/handlers/events/delivery-registered.handler";
import { DeliveryApplicationService } from "./application/services/delivery-applicationService";
import { RegisterDeliveryValidator } from "./application/validators/register-delivery.validator";

export const CommandHandlers = [RegisterDeliveryHandler];
export const EventHandlers = [DeliveryRegisteredHandler];
export const QueryHandlers = [GetDeliveriesHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([DeliveryTypeorm])
  ],
  controllers: [DeliveriesController],
  providers: [
    DeliveryApplicationService,
    RegisterDeliveryValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class DeliveriesModule{}