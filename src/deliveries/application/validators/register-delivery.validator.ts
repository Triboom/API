import { InjectRepository } from "@nestjs/typeorm";
import { DeliveryTypeorm } from "../../infrastructure/persistence/typeorm/entities/delivery.typeorm";
import { Repository } from "typeorm";
import { RegisterDeliveryRequestDto } from "../dtos/request/register-delivery-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

export class RegisterDeliveryValidator{
  constructor(
    @InjectRepository(DeliveryTypeorm)
    private deliveryRepository: Repository<DeliveryTypeorm>
  ) {}

  public async validate(registerDeliveryRequestDto: RegisterDeliveryRequestDto): Promise <AppNotification>{
    let notification: AppNotification = new AppNotification();

    const saleId: number = registerDeliveryRequestDto.saleId;
    if(saleId == null){
      notification.addError('SaleId is required', null);
    }
    const address: string = registerDeliveryRequestDto.address;
    if(address == null){
      notification.addError('Address line is required', null);
    }
    const district: string = registerDeliveryRequestDto.district;
    if(district == null){
      notification.addError('District code is required', null);
    }
    const estimatedDate: Date = registerDeliveryRequestDto.estimatedDeliveryDate;
    if(estimatedDate == null){
      notification.addError('Estimated Date is required', null);
    }
    if (notification.hasErrors()){
      return notification;
    }
    return notification;
  }
}