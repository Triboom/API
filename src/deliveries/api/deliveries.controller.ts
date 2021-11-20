import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { DeliveryApplicationService } from "../application/services/delivery-applicationService";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterDeliveryRequestDto } from "../application/dtos/request/register-delivery-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { RegisterDeliveryResponseDto } from "../application/dtos/response/register-delivery-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetDeliveriesQuery } from "../application/queries/get-deliveries.query";

@Controller('deliveries')
export class DeliveriesController{
  constructor(
    private readonly deliveryApplicationService: DeliveryApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerDeliveryRequestDto: RegisterDeliveryRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterDeliveryResponseDto> = await this.deliveryApplicationService.register(registerDeliveryRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getDeliveries(
    @Res({passthrough: true}) response): Promise<object>{
    try {
      const deliveries = await  this.queryBus.execute(new GetDeliveriesQuery());
      return ApiController.ok(response, deliveries);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}