import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SaleIdForDiscountsTypeORM } from '../value-objects/sale-id-discount.typeorm';
import { DiscountValueTypeORM } from '../value-objects/discount-value.typeorm';
import { DiscountStatus } from '../../../../domain/enums/discount.status.enum';

@Entity('discounts')
export class DiscountTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column('tinyint', { name: 'status',  width: 2, unsigned: true, nullable: false, })
  public status: DiscountStatus;

  @Column((type) => DiscountValueTypeORM, {prefix: false})
  public discountValue: DiscountValueTypeORM;

  @Column((type) => SaleIdForDiscountsTypeORM, {prefix: false})
  public saleId: SaleIdForDiscountsTypeORM;
}