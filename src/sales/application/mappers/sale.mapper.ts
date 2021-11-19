import { Sale } from '../../domain/entities/sale.entity';
import { SaleTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.typeorm';
import { SaleIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.id.typeorm';
import { SaleOrderStatusTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.order-status.typeorm';
import { SaleOrderQuantityTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.order-quantity.typeorm';
import { SaleDateTimeTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.date-time.typeorm';

export class SaleMapper {
  public static toTypeORM(sale: Sale): SaleTypeORM {
    const saleTypeORM: SaleTypeORM = new SaleTypeORM();
    saleTypeORM.id = SaleIdTypeORM.from(sale.getId().getValue());
    saleTypeORM.orderQuantity = SaleOrderQuantityTypeORM.from(sale.getOrderQuantity().getValue());
    saleTypeORM.dateTime = SaleDateTimeTypeORM.from(sale.getDateTime().getValue());
    saleTypeORM.orderStatus = SaleOrderStatusTypeORM.from(sale.getOrderStatus().getValue());
    return saleTypeORM;
  }
}