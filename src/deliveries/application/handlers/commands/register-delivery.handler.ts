import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { DeliveryTypeorm } from "../../../infrastructure/persistence/typeorm/entities/delivery.typeorm";
import { Repository } from "typeorm";
import { RegisterDeliveryCommand } from "../../commands/register-delivery.command";
import { AppNotification } from "../../../../common/application/app.notification";
import { SaleId } from "../../../../sales/domain/value-objects/sale-id.value";
import { Result } from "typescript-result";
import { Address } from "../../../../common/domain/value-objects/address.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";
import { Delivery } from "../../../domain/entities/delivery.entity";
import { DeliveryFactory } from "../../../domain/factories/delivery.factory";
import { DeliveryMapper } from "../../mappers/delivery.mapper";
import { DeliveryId } from "../../../domain/value-objects/delivery-id.value";
import { DeliveryStatus } from "../../../domain/value-objects/delivery-status.value";


@CommandHandler(RegisterDeliveryCommand)
export class RegisterDeliveryHandler implements ICommandHandler<RegisterDeliveryCommand>{
  constructor(
    @InjectRepository(DeliveryTypeorm)
    private deliveryRepository: Repository<DeliveryTypeorm>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterDeliveryCommand) {
    const saleIdResult: Result<AppNotification, SaleId> = SaleId.create(command.saleId);
    if(saleIdResult.isFailure()){
      return 0;
    }

    const addressResult: Result<AppNotification, Address> = Address.create(command.address, command.district);
    if(addressResult.isFailure()){
      return 0;
    }
    const estimatedDate: Result<AppNotification, DateTime> = DateTime.create(command.estimatedDeliveryDate);
    if(estimatedDate.isFailure()){
      return 0;
    }

    const deliveryStatus: Result<AppNotification, DeliveryStatus> = DeliveryStatus.create(1);
    if(deliveryStatus.isFailure()){
      return 0;
    }

    let delivery: Delivery = DeliveryFactory.createFrom(saleIdResult.value, addressResult.value, estimatedDate.value, deliveryStatus.value);
    let deliveryTypeOrm = DeliveryMapper.toTypeOrm(delivery);
    deliveryTypeOrm = await this.deliveryRepository.save(deliveryTypeOrm);
    if (deliveryTypeOrm == null){
      return 0;
    }
    let deliveryId: number = Number(deliveryTypeOrm.id.value);
    delivery.changeId(DeliveryId.of(deliveryId));
    delivery = this.publisher.mergeObjectContext(delivery);
    delivery.register();
    delivery.commit();
    return deliveryId;
  }
}
