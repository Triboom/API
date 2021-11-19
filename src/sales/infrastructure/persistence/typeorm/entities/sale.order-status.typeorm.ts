import { PrimaryGeneratedColumn } from 'typeorm';

export class SaleOrderStatusTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'orderStatus', unsigned: true })
  public value: boolean;

  private constructor(value: boolean) {
    this.value = value;
  }

  public static from(value: boolean): SaleOrderStatusTypeORM  {
    return new SaleOrderStatusTypeORM(value);
  }
}