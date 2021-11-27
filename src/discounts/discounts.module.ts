import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountTypeORM } from './infrastructure/persistence/typeorm/entities/discount.typeorm';
import { DiscountsController } from './api/discounts.controller';
import { DiscountsApplicationService } from './application/services/discounts-application.service';
import { DiscountMoneyValidator } from './application/validators/discount-money.validator';
import { SaleTypeORM } from '../sales/infrastructure/persistence/typeorm/entities/sale.typeorm';
import { DiscountMoneyHandler } from './application/handlers/commands/discount-money.handler';
import { ApplyDiscountedHandler } from './application/handlers/events/apply-discounted.handler';

export const CommandHandlers = [DiscountMoneyHandler];
export const EventHandlers = [ApplyDiscountedHandler];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([DiscountTypeORM, SaleTypeORM]),
  ],
  controllers: [DiscountsController],
  providers: [
    DiscountsApplicationService,
    DiscountMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class DiscountsModule {}