import { Column, PrimaryGeneratedColumn } from "typeorm";

export class SaleDateTimeTypeORM {
  @Column('date', { name: 'dateTime', nullable: false })
  public value: Date

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): SaleDateTimeTypeORM  {
    return new SaleDateTimeTypeORM(value);
  }
}