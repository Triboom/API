import { Column } from 'typeorm';

export class DiscountValueTypeORM {
  @Column('decimal', { name: 'discount', nullable: true })
  public discount: number;

  private constructor(discount: number) {
    this.discount = discount;
  }

  public static from(discount: number): DiscountValueTypeORM {
    return new DiscountValueTypeORM(discount);
  }
}