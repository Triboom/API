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

    const date: Date = registerSaleRequestDto.dateTime;
    if (date == null) {
      notification.addError('Sale dateTime is required', null);
    }

    const orderStatus: Boolean = registerSaleRequestDto.orderStatus;
    if (orderStatus == null) {
      notification.addError('Sale orderStatus is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }

}