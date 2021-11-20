import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { DeliveriesModule } from "./deliveries/deliveries.module";

@Module({
  imports: [CustomersModule, ProductsModule, SalesModule, DeliveriesModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
