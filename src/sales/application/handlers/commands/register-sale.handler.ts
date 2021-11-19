import { EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterSaleCommand } from '../../commands/register-sale.command';
import { SaleTypeORM } from '../../../infrastructure/persistence/typeorm/entities/sale.typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { OrderQuantity } from '../../../domain/value-objects/order-quantity.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { OrderStatus } from '../../../domain/value-objects/order-status.value';
import { Sale } from '../../../domain/entities/sale.entity';
import { SaleFactory } from '../../../domain/factories/sale.factory';
import { SaleMapper } from '../../mappers/sale.mapper';
import { SaleId } from '../../../domain/value-objects/sale-id.value';

export class RegisterSaleHandler implements ICommandHandler<RegisterSaleCommand>{
  constructor(
    @InjectRepository(SaleTypeORM)
    private saleRepository: Repository<SaleTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterSaleCommand){
    const orderQuantityResult: Result<AppNotification, OrderQuantity> = OrderQuantity.create(command.orderQuantity)
    if (orderQuantityResult.isFailure()) {
      return 0;
    }
    const dateTimeResult: Result<AppNotification, DateTime> = DateTime.create(command.dateTime);
    if (dateTimeResult.isFailure()) {
      return 0;
    }

    const orderStatusResult: Result<AppNotification, OrderStatus> = OrderStatus.create(command.orderStatus);
    if (orderStatusResult.isFailure()) {
      return 0;
    }
    
    let sale: Sale = SaleFactory.createFrom(orderQuantityResult.value, dateTimeResult.value, orderStatusResult.value);
    let saleTypeORM = SaleMapper.toTypeORM(sale);
    saleTypeORM = await this.saleRepository.save(saleTypeORM);
    if (saleTypeORM == null) {
      return 0;
    }
    const saleId:number = Number(saleTypeORM.id.value);
    sale.changeId(SaleId.create(saleId));
    sale = this.publisher.mergeObjectContext(sale);
    sale.register();
    sale.commit();
    return saleId;
  }

}