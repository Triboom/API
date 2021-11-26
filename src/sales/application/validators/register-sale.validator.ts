import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { SaleTypeORM } from '../../infrastructure/persistence/typeorm/entities/sale.typeorm';
import { RegisterSaleRequestDto } from '../dtos/request/register-sale-request.dto';

export class RegisterSaleValidator{
  constructor(
    @InjectRepository(SaleTypeORM)
    private saleRespository: Repository<SaleTypeORM>
  ){}

  public async validate(
    registerSaleRequestDto: RegisterSaleRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const orderQuantity: number = registerSaleRequestDto.orderQuantity;
    if (orderQuantity == null || orderQuantity < 0) {
      notification.addError('Sale orderQuantity is required or is less than 0', null);
    }

    const orderStatus: Boolean = registerSaleRequestDto.orderStatus;
    if (orderStatus == null) {
      notification.addError('Sale orderStatus is required', null);
    }

    const price: number = registerSaleRequestDto.price;
    if (price < 0) {
      notification.addError('Product price is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }

    const productId: number = registerSaleRequestDto.productId;
    if (productId == null) {
      notification.addError('Sale productId is required', null);
    }
    
    const customerId: number = registerSaleRequestDto.customerId;
    if (customerId == null) {
      notification.addError('Sale customerId is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }

}