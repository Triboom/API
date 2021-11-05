import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { ProductTypeORM } from "../../infrastructure/persistence/typeorm/entities/product.typeorm";
import { RegisterProductResquestDto } from "../dtos/request/register-product-request.dto";

export class RegisterProductValidator{
    constructor(
        @InjectRepository(ProductTypeORM)
        private productRespository: Repository<ProductTypeORM>
    ){}

    public async validate(
        registerProductResquestDto: RegisterProductResquestDto,
      ): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const productName: string = registerProductResquestDto.name.trim();
        if (productName.length <= 0) {
          notification.addError('Product productName is required', null);
        }

        const price: number = registerProductResquestDto.price;
        if (price < 0) {
          notification.addError('Product price is required', null);
        }
        if (notification.hasErrors()) {
          return notification;
        }
        return notification;
      }
    
}