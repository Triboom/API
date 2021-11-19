import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { response } from "express";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { SaleApplicationService } from '../application/services/sales-applicationService';
import { RegisterSaleRequestDto } from '../application/dtos/request/register-sale-request.dto';
import { RegisterSaleResponseDto } from '../application/dtos/response/register-sale-response.dto';
import { GetSalesQuery } from '../application/queries/get-sales.query';

@Controller('sales')
export class SalesController{
  constructor(
    private readonly salesApplicationService: SaleApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerSaleRequestDto: RegisterSaleRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try{
      // @ts-ignore
      const result: Result<AppNotification, RegisterSaleResponseDto> = await this.salesApplicationService.register(RegisterSaleRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }

  }

  @Get()
  async getCustomers(@Res({passthrough: true}) response): Promise<object> {
    try {
      const sales = await this.queryBus.execute(new GetSalesQuery());
      return ApiController.ok(response, sales);
    } catch(error){
      return ApiController.serverError(response, error);
    }
  }
}