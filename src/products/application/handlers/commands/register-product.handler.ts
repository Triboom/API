import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { Money } from "src/common/domain/value-objects/money.value";
import { Product } from "src/products/domain/entities/product.entity";
import { ProductFactory } from "src/products/domain/factories/product.factory";
import { ProductId } from "src/products/domain/value-objects/product-id.value";
import { ProductName } from "src/products/domain/value-objects/product-name.value";
import { ProductTypeORM } from "src/products/infrastructure/persistence/typeorm/entities/product.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { RegisterProductCommand } from "../../commands/register-product-command";
import { ProductMapper } from "../../mappers/product.mapper";

@CommandHandler(RegisterProductCommand)
export class RegisterProductHandler implements ICommandHandler<RegisterProductCommand> {
    constructor(
        @InjectRepository(ProductTypeORM)
        private productRepository: Repository<ProductTypeORM>,
        private publisher: EventPublisher,
    ){}

    async execute(command: RegisterProductCommand){
        const nameResult: Result<AppNotification, ProductName> = ProductName.create(command.name);
        if(nameResult.isFailure()){
            return 0;
        }

        const priceResult: Result<AppNotification, Money> = Money.create(Number(command.price), "PEN");
        if(priceResult.isFailure()){
            return 0;
        }

        let product: Product = ProductFactory.createFrom(nameResult.value, priceResult.value)
        let productTypeORM = ProductMapper.toTypeORM(product);
        productTypeORM = await this.productRepository.save(productTypeORM);
        if (productTypeORM === null){
            return 0;
        }
        
        const productId: number = Number(productTypeORM.id.value);
        product.changeId(ProductId.create(productId));
        product = this.publisher.mergeObjectContext(product); // ?
        product.register();
        product.commit();
        return productId;
    }
}