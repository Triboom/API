import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterSaleValidator } from '../validators/register-sale.validator';
import { RegisterSaleRequestDto } from '../dtos/request/register-sale-request.dto';
import { RegisterSaleCommand } from '../commands/register-sale.command';
import { RegisterSaleResponseDto } from '../dtos/response/register-sale-response.dto';

@Injectable()
export class SaleApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerSaleValidator: RegisterSaleValidator) {
  }

  async register(registerSaleRequestDto: RegisterSaleRequestDto,
  ): Promise<Result<AppNotification, RegisterSaleRequestDto>> {
    const notification: AppNotification = await this.registerSaleValidator.validate(registerSaleRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerSaleCommand: RegisterSaleCommand = new RegisterSaleCommand(
      registerSaleRequestDto.orderQuantity,
      registerSaleRequestDto.dateTime,
      registerSaleRequestDto.orderStatus,
    );
    const saleId = await this.commandBus.execute(registerSaleCommand);
    const registerSaleResponseDto: RegisterSaleResponseDto = new RegisterSaleResponseDto(
      saleId,
      registerSaleRequestDto.orderQuantity,
      registerSaleRequestDto.dateTime,
      registerSaleRequestDto.orderStatus,
    );
    return Result.ok(registerSaleResponseDto);
  }
}