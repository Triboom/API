import { ProductName } from '../value-objects/product-name.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { Product } from '../entities/product.entity';
import {ProductId} from '../value-objects/product-id.value';

export class ProductFactory {
    public static createFrom(name:ProductName, price:Money ): Product{
        return new Product(ProductId.create(0), name, price);
    }

    public static withId(productId: ProductId, name: ProductName, price: Money): Product {
        return new Product(productId, name, price);
    }
}