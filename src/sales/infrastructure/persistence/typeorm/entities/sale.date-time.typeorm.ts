import { PrimaryGeneratedColumn } from 'typeorm';

export class SaleDateTimeTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'dateTime', unsigned: true })
  public value: Date;

  private constructor(value: Date) {
    this.value = value;
  }

  public static from(value: Date): SaleDateTimeTypeORM  {
    return new SaleDateTimeTypeORM(value);
  }
}