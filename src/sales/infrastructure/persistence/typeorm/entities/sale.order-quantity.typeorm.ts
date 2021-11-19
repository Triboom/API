import { PrimaryGeneratedColumn } from 'typeorm';

export class SaleOrderQuantityTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'orderQuantity', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SaleOrderQuantityTypeORM  {
    return new SaleOrderQuantityTypeORM(value);
  }
}