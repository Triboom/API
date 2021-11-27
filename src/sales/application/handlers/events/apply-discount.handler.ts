import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { ApplyDiscount } from '../../../../discounts/domain/events/apply-discount.event';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleTypeORM } from '../../../infrastructure/persistence/typeorm/entities/sale.typeorm';
import { getManager, Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { SaleId } from '../../../domain/value-objects/sale-id.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { SaleFactory } from '../../../domain/factories/sale.factory';
import { Sale } from '../../../domain/entities/sale.entity';
import { CustomerId } from '../../../../customers/domain/value-objects/customer-id.value';
import { ProductId } from '../../../../products/domain/value-objects/product-id.value';
import { OrderQuantity } from '../../../domain/value-objects/order-quantity.value';
import { OrderStatus } from '../../../domain/value-objects/order-status.value';
import { SaleMapper } from '../../mappers/sale.mapper';
import { CompleteDiscount } from '../../../../discounts/application/commands/complete-discount.command';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(ApplyDiscount)
export class ApplyDiscountHandler implements IEventHandler<ApplyDiscount> {
  constructor(
    @InjectRepository(SaleTypeORM)
    private saleRepository: Repository<SaleTypeORM>,
    private commandBus: CommandBus) {
  }

  async handle(event: ApplyDiscount) {
    let saleTypeORM: SaleTypeORM = await this.saleRepository
      .createQueryBuilder()
      .where('id = :saleId')
      .setParameter('saleId', Number(event.saleId))
      .getOne();
    if (saleTypeORM == null) {
      console.log('ApplyDiscount saleTypeORM not found');
      return;
    }
    console.log(saleTypeORM.id);
    const saleIdResult: Result<AppNotification, SaleId> = SaleId.create(saleTypeORM.id);
    if (saleIdResult.isFailure()) {
      return;
    }

    const orderQuantityResult: Result<AppNotification, OrderQuantity> = OrderQuantity.create(saleTypeORM.orderQuantity.value);
    if (orderQuantityResult.isFailure()) {
      return;
    }

    const orderStatusResult: Result<AppNotification, OrderStatus> = OrderStatus.create(saleTypeORM.orderStatus.value);
    if (orderStatusResult.isFailure()) {
      return;
    }

    const price: Money = Money.create_money(saleTypeORM.price.amount, saleTypeORM.price.currency);
    let sale: Sale = SaleFactory.withId(SaleId.of(saleTypeORM.id), orderQuantityResult.value, orderStatusResult.value, CustomerId.of(saleTypeORM.customerId.value), ProductId.of(saleTypeORM.productId.value), price);
    const discountAmount: Money = Money.create_money(event.discount, 'PEN');
    const discountResult: Result<AppNotification, Sale> = sale.discount(discountAmount);
    if (discountResult.isFailure()) {
      console.log('ApplyDiscount Error');
      return;
    }
    saleTypeORM = SaleMapper.toTypeORM(sale);
    saleTypeORM = await this.saleRepository.save(saleTypeORM);
    await getManager().transaction(async transactionalEntityManager => {
      //await transactionalEntityManager.save(saleTypeORM)
      if (saleTypeORM == null) {
        console.log('ApplyDiscount error');
        return;
      }
      //const completeDiscount: CompleteDiscount = new CompleteDiscount(event.discountId);
      //await this.commandBus.execute(completeDiscount);
    });
  }
}