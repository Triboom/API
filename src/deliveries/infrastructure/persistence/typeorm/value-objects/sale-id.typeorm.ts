import { Column } from 'typeorm';

export class SaleIdTypeorm{
  @Column('bigint', { name: 'sale_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SaleIdTypeorm  {
    return new SaleIdTypeorm(value);
  }
}