import { Column } from 'typeorm';

export class CustomerIdForSalesTypeORM {
    @Column('bigint', { name: 'customer_id', unsigned: true })
    public value: number;
  
    private constructor(value: number) {
      this.value = value;
    }
  
    public static from(value: number): CustomerIdForSalesTypeORM  {
      return new CustomerIdForSalesTypeORM(value);
    }
  }