import { Column } from 'typeorm';

export class ProductIdTypeORM {
    @Column('bigint', { name: 'product_id', unsigned: true })
    public value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static from(value: number): ProductIdTypeORM  {
      return new ProductIdTypeORM(value);
    }
  }