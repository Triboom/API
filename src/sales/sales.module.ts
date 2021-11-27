import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterSaleHandler } from './application/handlers/commands/register-sale.handler';
import { SaleTypeORM } from './infrastructure/persistence/typeorm/entities/sale.typeorm';
import { SaleRegisteredHandler } from './application/handlers/events/sale-registered.handler';
import { GetSalesHandler } from './application/handlers/queries/get-sales.handler';
import { SalesController } from './api/sales.controller';
import { RegisterSaleValidator } from './application/validators/register-sale.validator';
import { SaleApplicationService } from './application/services/sales-application.service';
import { GetSaleByIdHandler } from './application/handlers/queries/get-sale-by-id.handler';
import { ApplyDiscountHandler } from './application/handlers/events/apply-discount.handler';

export const CommandHandlers = [RegisterSaleHandler];
export const EventHandlers = [SaleRegisteredHandler, ApplyDiscountHandler];
export const QueryHandlers = [GetSalesHandler, GetSaleByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SaleTypeORM]),
  ],
  controllers: [SalesController],
  providers: [
    SaleApplicationService,
    RegisterSaleValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class SalesModule {}