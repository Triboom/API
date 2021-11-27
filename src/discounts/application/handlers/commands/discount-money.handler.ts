import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DiscountMoney } from '../../commands/discount-money.command';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleTypeORM } from '../../../../sales/infrastructure/persistence/typeorm/entities/sale.typeorm';
import { Repository } from 'typeorm';
import { DiscountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/discount.typeorm';
import { DiscountValue } from '../../../domain/value-objects/discount.value';
import { Discount } from '../../../domain/entities/discount.entity';
import { DiscountFactory } from '../../../domain/factories/discount.factory';
import { DiscountStatus } from '../../../domain/enums/discount.status.enum';
import { DiscountMapper } from '../../mappers/discount.mapper';
import { DiscountId } from '../../../domain/value-objects/discount-id.value';

@CommandHandler(DiscountMoney)
export class DiscountMoneyHandler implements ICommandHandler<DiscountMoney> {
  constructor(
    @InjectRepository(SaleTypeORM) private saleRepository: Repository<SaleTypeORM>,
    @InjectRepository(DiscountTypeORM) private discountRepository: Repository<DiscountTypeORM>,
    private publisher: EventPublisher,
    ) {
  }

  async execute(command: DiscountMoney){
    let discountId: number = 0;
    const saleId: string = command.saleId.trim();
    const saleTypeORM: SaleTypeORM = await this.saleRepository
      .createQueryBuilder()
      .setLock('pessimistic_read')
      .useTransaction(true)
      .where('id = :saleId')
      .setParameter("saleId", saleId)
      .getOne();
    if(saleTypeORM == null){
      return discountId;
    }
    const amountDiscount: DiscountValue = DiscountValue.create(command.discount);
    let discount: Discount = DiscountFactory.createFrom(DiscountStatus.STARTED, amountDiscount, null);
    let discountTypeORM: DiscountTypeORM = DiscountMapper.toTypeORM(discount);
    discountTypeORM = await this.discountRepository.save(discountTypeORM);
    if (discountTypeORM == null) {
      return discountId;
    }
    discountId = Number(discountTypeORM.id);
    discount.changeId(DiscountId.of(discountId));
    discount = this.publisher.mergeObjectContext(discount);
    //discount.deposit();
    discount.commit();
    return discountId;
  }
}