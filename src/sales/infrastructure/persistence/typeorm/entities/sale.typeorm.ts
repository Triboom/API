import { Column, Entity } from 'typeorm';
import { SaleIdTypeORM } from './sale.id.typeorm';
import { SaleOrderQuantityTypeORM } from './sale.order-quantity.typeorm';
import { SaleDateTimeTypeORM } from './sale.date-time.typeorm';
import { SaleOrderStatusTypeORM } from './sale.order-status.typeorm';
import { CustomerIdForSalesTypeORM } from './customer-id-sale.typeorm';
import { CustomerIdTypeORM } from 'src/customers/infrastructure/persistence/typeorm/entities/customer.id.typeorm';
import { MoneyTypeORM } from 'src/common/infrastructure/persistence/typeorm/entities/money.typeorm';
import { ProductIdForSalesTypeORM } from './product-id-sale.typeorm';

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

  @Column((type) => CustomerIdForSalesTypeORM, { prefix: false })
  public customerId: CustomerIdForSalesTypeORM;

  @Column((type) => ProductIdForSalesTypeORM, { prefix: false })
  public productId: ProductIdForSalesTypeORM;

}