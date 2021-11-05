import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerTypeORM } from "../../infrastructure/persistence/typeorm/entities/customer.typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";

@Injectable()
export class RegisterCustomerValidator{
  constructor(
    @InjectRepository(CustomerTypeORM)
    private customerRepository: Repository<CustomerTypeORM>
  ) {}

  public async validate(
    registerCustomerRequestDto: RegisterCustomerRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerCustomerRequestDto.firstName.trim();
    if (firstName.length <= 0) {
      notification.addError('Customer firstName is required', null);
    }
    const lastName: string = registerCustomerRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Customer lastName is required', null);
    }
    const dni: string = registerCustomerRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Customer dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: CustomerTypeORM = await this.customerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (customer != null) {
      notification.addError('Customer dni is taken', null);
    }
    return notification;
  }
}