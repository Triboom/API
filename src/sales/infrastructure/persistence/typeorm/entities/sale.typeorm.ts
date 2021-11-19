import { Column, Entity } from 'typeorm';
import { SaleIdTypeORM } from './sale.id.typeorm';
import { SaleOrderQuantityTypeORM } from './sale.order-quantity.typeorm';
import { SaleDateTimeTypeORM } from './sale.date-time.typeorm';
import { SaleOrderStatusTypeORM } from './sale.order-status.typeorm';
import { CustomerIdTypeORM } from '../../../../../customers/infrastructure/persistence/typeorm/entities/customer.id.typeorm';

@Entity('sales')
export class SaleTypeORM {
  @Column((type) => SaleIdTypeORM, { prefix: false })
  public id: CustomerIdTypeORM;

  @Column((type) => SaleOrderQuantityTypeORM, { prefix: false })
  public orderQuantity: SaleOrderQuantityTypeORM;

  @Column((type) => SaleDateTimeTypeORM, { prefix: false })
  public dateTime: SaleDateTimeTypeORM;

  @Column((type) => SaleOrderStatusTypeORM, { prefix: false })
  public orderStatus: SaleOrderStatusTypeORM;
}