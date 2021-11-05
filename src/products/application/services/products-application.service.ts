import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterProductValidator } from "../validators/register-product.validator";
import { RegisterProductResquestDto } from "../dtos/request/register-product-request.dto";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterProductCommand } from "../commands/register-product-command";
import { RegisterProductResponseDto } from "../dtos/response/register-product-response.dto";

@Injectable()
export class ProductApplicationService{
    constructor(
        private commandBus: CommandBus,
        private registerProductValidator: RegisterProductValidator){}

    async register(registerProductResquestDto: RegisterProductResquestDto
        ):Promise<Result<AppNotification, RegisterProductResquestDto>>{
            const notification: AppNotification = await this.registerProductValidator.validate(registerProductResquestDto);
            if(notification.hasErrors()) {
                return Result.error(notification);
            }
            const registerProductCommand: RegisterProductCommand = new RegisterProductCommand(
                registerProductResquestDto.name,
                String(registerProductResquestDto.price)
            )
            const productId = await this.commandBus.execute(registerProductCommand);
            const registerProductResponseDto: RegisterProductResponseDto = new RegisterProductResponseDto(
                productId,
                registerProductResquestDto.name,
                registerProductResquestDto.price,
            );
            return Result.ok(registerProductResponseDto);
    }
}