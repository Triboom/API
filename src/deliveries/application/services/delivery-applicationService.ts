import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterDeliveryValidator } from "../validators/register-delivery.validator";
import { RegisterDeliveryRequestDto } from "../dtos/request/register-delivery-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterDeliveryCommand } from "../commands/register-delivery.command";
import { RegisterDeliveryResponseDto } from "../dtos/response/register-delivery-response.dto";

@Injectable()
export class DeliveryApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerDeliveryValidator: RegisterDeliveryValidator) {
  }

  async register(registerDeliveryRequestDto: RegisterDeliveryRequestDto)
  :Promise<Result<AppNotification,RegisterDeliveryResponseDto>> {
    const notification: AppNotification = await this.registerDeliveryValidator.validate(registerDeliveryRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    const registerDeliveryCommand: RegisterDeliveryCommand = new RegisterDeliveryCommand(
      registerDeliveryRequestDto.saleId,
      registerDeliveryRequestDto.address,
      registerDeliveryRequestDto.district,
      registerDeliveryRequestDto.estimatedDeliveryDate
    );
    const deliveryId = await this.commandBus.execute(registerDeliveryCommand);
    let district = 1; // change
    const registerDeliveryResponseDto: RegisterDeliveryResponseDto = new RegisterDeliveryResponseDto(
      deliveryId,
      registerDeliveryRequestDto.saleId,
      registerDeliveryRequestDto.address,
      registerDeliveryRequestDto.district,
      registerDeliveryRequestDto.estimatedDeliveryDate,
      registerDeliveryRequestDto.estimatedDeliveryDate,
      district
    );
    return Result.ok(registerDeliveryResponseDto);
  }
}