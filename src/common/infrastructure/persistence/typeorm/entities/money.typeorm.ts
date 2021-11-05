import { Column } from "typeorm";

export class  MoneyTypeORM{
    @Column('int', { name: 'ammount', nullable: false })
    public amount: number;
  
    @Column('varchar', { name: 'currency', length: 75, nullable: false })
    public currency: string;

    private constructor(amount: number, currency: string) {
        this.amount = amount;
        this.currency = currency;
      }
    
      public static from(amount: number, currency: string): MoneyTypeORM {
        return new MoneyTypeORM(amount, currency);
      }
}