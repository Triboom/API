import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './api/products.controller';
import { RegisterProductHandler } from './application/handlers/commands/register-product.handler';
import { ProductRegisteredHandler } from './application/handlers/events/product-registered-handler';
import { GetProductsHandler } from './application/handlers/queries/get-products.handler';
import { ProductApplicationService } from './application/services/products-application.service';
import { RegisterProductValidator } from './application/validators/register-product.validator';
import { ProductTypeORM } from './infrastructure/persistence/typeorm/entities/product.typeorm';

export const CommandHandlers = [RegisterProductHandler];
export const EventHandlers = [ProductRegisteredHandler];
export const QueryHandlers = [GetProductsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ProductTypeORM]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductApplicationService,
    RegisterProductValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ProductsModule {}