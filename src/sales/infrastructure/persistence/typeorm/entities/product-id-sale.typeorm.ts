import { Column } from 'typeorm';

export class ProductIdForSalesTypeORM {
    @Column('bigint', { name: 'product_id', unsigned: true })
    public value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static from(value: number): ProductIdForSalesTypeORM  {
      return new ProductIdForSalesTypeORM(value);
    }
  }