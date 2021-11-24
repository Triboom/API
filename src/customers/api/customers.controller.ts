import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { CustomersApplicationService } from "../application/services/customers-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterCustomerRequestDto } from "../application/dtos/request/register-customer-request.dto";
import { RegisterCustomerResponseDto } from "../application/dtos/response/register-customer-response.dto";
import { AppNotification } from "../../common/application/app.notification";
import { Result } from "typescript-result";
import { ApiController } from "../../common/api/api.controller";
import { GetCustomersQuery } from '../application/queries/get-customers.query';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersApplicationService: CustomersApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerCustomerRequestDto: RegisterCustomerRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      // @ts-ignore
      const result: Result<AppNotification, RegisterCustomerResponseDto> = await this.customersApplicationService.register(registerCustomerRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getCustomers(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetCustomersQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
