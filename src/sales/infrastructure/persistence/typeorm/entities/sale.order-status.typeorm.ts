import { Column, PrimaryGeneratedColumn } from "typeorm";

export class SaleOrderStatusTypeORM {
  @Column('boolean', { name: 'orderStatus', nullable: false })
  public value: boolean;

  private constructor(value: boolean) {
    this.value = value;
  }

  public static from(value: boolean): SaleOrderStatusTypeORM  {
    return new SaleOrderStatusTypeORM(value);
  }
}