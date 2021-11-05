import { MoneyTypeORM } from "src/common/infrastructure/persistence/typeorm/entities/money.typeorm";
import { CustomerIdTypeORM } from "src/customers/infrastructure/persistence/typeorm/entities/customer.id.typeorm";
import { Column, Entity, Unique } from "typeorm";
import { ProductIdTypeORM } from "./product.id.typeorm";
import { ProductNameTypeORM } from "./product.name.typeorm";

@Entity('products')
export class ProductTypeORM {
    @Column((type) => ProductIdTypeORM, {prefix: false})
    public id: CustomerIdTypeORM;

    @Column((type) => ProductNameTypeORM, {prefix: false})
    public name: ProductNameTypeORM;

    @Column((type) => MoneyTypeORM, {prefix: false})
    public price: MoneyTypeORM; 
}