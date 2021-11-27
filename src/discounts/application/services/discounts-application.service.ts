import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DiscountMoneyValidator } from '../validators/discount-money.validator';
import { DiscountRequestDto } from '../dtos/request/DiscountRequestDto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { DiscountResponseDto } from '../dtos/response/discount-response.dto';
import { DiscountMoney } from '../commands/discount-money.command';
import { DiscountStatus, DiscountStatusLabel } from '../../domain/enums/discount.status.enum';

@Injectable()
export class DiscountsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private discountValidator: DiscountMoneyValidator,
  ) {}

  async discount(discountRequestDto: DiscountRequestDto): Promise<Result<AppNotification, DiscountResponseDto>>{
    const notification: AppNotification = await this.discountValidator.validate(discountRequestDto);
    if(notification.hasErrors()){
      return Result.error(notification);
    }
    const discountMoney = new DiscountMoney(
      discountRequestDto.saleId,
      discountRequestDto.discount,
      DiscountStatus.STARTED
    );
    const discountId: number = await this.commandBus.execute(discountMoney);
    const discountResponseDto: DiscountResponseDto = new DiscountResponseDto(
      discountId,
      discountRequestDto.discount,
      discountRequestDto.saleId,
      DiscountStatusLabel.get(DiscountStatus.STARTED),
    );
    return Result.ok(discountResponseDto);
  }
}