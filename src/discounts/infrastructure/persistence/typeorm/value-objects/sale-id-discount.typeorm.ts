import { Column } from 'typeorm';

export class SaleIdForDiscountsTypeORM{
  @Column('bigint', { name: 'sale_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): SaleIdForDiscountsTypeORM {
    return new SaleIdForDiscountsTypeORM(value);
  }
}