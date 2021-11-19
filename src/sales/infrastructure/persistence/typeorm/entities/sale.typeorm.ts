import { Column, Entity } from 'typeorm';
import { SaleIdTypeORM } from './sale.id.typeorm';
import { SaleOrderQuantityTypeORM } from './sale.order-quantity.typeorm';
import { SaleDateTimeTypeORM } from './sale.date-time.typeorm';
import { SaleOrderStatusTypeORM } from './sale.order-status.typeorm';
import { CustomerIdTypeORM } from '../../../../../customers/infrastructure/persistence/typeorm/entities/customer.id.typeorm';
import { MoneyTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/money.typeorm';
import { ProductIdTypeORM } from 'src/products/infrastructure/persistence/typeorm/entities/product.id.typeorm';

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

  @Column((type) => MoneyTypeORM, { prefix: false })
  public price: MoneyTypeORM;

  @Column((type) => CustomerIdTypeORM, { prefix: false })
  public customerId: CustomerIdTypeORM;

  @Column((type) => ProductIdTypeORM, { prefix: false })
  public productId: ProductIdTypeORM;

}