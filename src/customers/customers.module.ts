import { Module } from '@nestjs/common';
import { CustomersController } from './api/customers.controller';
import { CustomersApplicationService } from './application/services/customers-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterCustomerValidator } from './application/validators/register-customer.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCustomerHandler } from './application/handlers/commands/register-customer.handler';
import { CustomerRegisteredHandler } from './application/handlers/events/customer-registered.handler';
import { GetCustomersHandler } from './application/handlers/queries/get-customers.handler';
import { CustomerTypeORM } from './infrastructure/persistence/typeorm/entities/customer.typeorm';

export const CommandHandlers = [RegisterCustomerHandler];
export const EventHandlers = [CustomerRegisteredHandler];
export const QueryHandlers = [GetCustomersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerTypeORM]),
  ],
  controllers: [CustomersController],
  providers: [
    CustomersApplicationService,
    RegisterCustomerValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class CustomersModule {}