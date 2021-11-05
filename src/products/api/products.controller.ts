import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { response } from "express";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { RegisterProductResquestDto } from "../application/dtos/request/register-product-request.dto";
import { RegisterProductResponseDto } from "../application/dtos/response/register-product-response.dto";
import { GetProductsQuery } from "../application/queries/get-products.query";
import { ProductApplicationService } from "../application/services/products-application.service";

@Controller('products')
export class ProductsController{
    constructor(
        private readonly productsApplicationService: ProductApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register(
        @Body() registerProductRequestDto: RegisterProductResquestDto,
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try{
            // @ts-ignore
            const result: Result<AppNotification, RegisterProductResponseDto> = await this.productsApplicationService.register(registerProductRequestDto);
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
            const products = await this.queryBus.execute(new GetProductsQuery());
            return ApiController.ok(response, products);
        } catch(error){
            return ApiController.serverError(response, error);
        }
    } 
}