import { Body, Controller, Post, Res } from '@nestjs/common';
import { DiscountsApplicationService } from '../application/services/discounts-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { DiscountRequestDto } from '../application/dtos/request/DiscountRequestDto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { DiscountResponseDto } from '../application/dtos/response/discount-response.dto';
import { ApiController } from '../../common/api/api.controller';

@Controller('discounts')
export class DiscountsController {
  constructor(
    private readonly discountsApplicationService: DiscountsApplicationService,
    private readonly query: QueryBus,
  ) {
  }

  @Post('/markdown')
  async markdown(
    @Body() discountRequestDto: DiscountRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DiscountResponseDto> = await this.discountsApplicationService.discount(discountRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}