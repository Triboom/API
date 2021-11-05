import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterCustomerValidator } from "../validators/register-customer.validator";
import { RegisterCustomerRequestDto } from "../dtos/request/register-customer-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterCustomerCommand } from "../commands/register-customer.command";
import { RegisterCustomerResponseDto } from "../dtos/response/register-customer-response.dto";


@Injectable()
export class CustomersApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerCustomerValidator: RegisterCustomerValidator
  ) {
  }

  async register(
    registerCustomerRequestDto: RegisterCustomerRequestDto
  ): Promise<Result<AppNotification, RegisterCustomerRequestDto>> {
    const notification: AppNotification = await this.registerCustomerValidator.validate(registerCustomerRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerCustomerCommand: RegisterCustomerCommand = new RegisterCustomerCommand(
      registerCustomerRequestDto.firstName,
      registerCustomerRequestDto.lastName,
      registerCustomerRequestDto.dni
    );
    const customerId = await this.commandBus.execute(registerCustomerCommand);
    const registerCustomerResponseDto: RegisterCustomerResponseDto = new RegisterCustomerResponseDto(
      customerId,
      registerCustomerRequestDto.firstName,
      registerCustomerRequestDto.lastName,
      registerCustomerRequestDto.dni
    );
    return Result.ok(registerCustomerResponseDto);
  }
}
