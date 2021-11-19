import { Column, PrimaryGeneratedColumn } from "typeorm";

export class SaleOrderQuantityTypeORM {
  @Column('int', { name: 'name', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): SaleOrderQuantityTypeORM  {
    return new SaleOrderQuantityTypeORM(value);
  }
}