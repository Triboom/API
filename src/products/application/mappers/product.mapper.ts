import { MoneyTypeORM } from "src/common/infrastructure/persistence/typeorm/entities/money.typeorm";
import { Product } from "src/products/domain/entities/product.entity";
import { ProductIdTypeORM } from "src/products/infrastructure/persistence/typeorm/entities/product.id.typeorm";
import { ProductNameTypeORM } from "src/products/infrastructure/persistence/typeorm/entities/product.name.typeorm";
import { ProductTypeORM } from "src/products/infrastructure/persistence/typeorm/entities/product.typeorm";

export class ProductMapper {
    public static toTypeORM(product: Product): ProductTypeORM{
        const productTypeORM: ProductTypeORM = new ProductTypeORM();
        productTypeORM.id = ProductIdTypeORM.from(product.getId().getValue());
        productTypeORM.name = ProductNameTypeORM.from(product.getName().getProductName());
        productTypeORM.price = MoneyTypeORM.from(product.getPrice().getAmount(),product.getPrice().getCurrency())
        return productTypeORM;
    }
}