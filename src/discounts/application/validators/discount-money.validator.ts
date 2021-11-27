import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleTypeORM } from '../../../sales/infrastructure/persistence/typeorm/entities/sale.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../common/application/app.notification';
import { DiscountRequestDto } from '../dtos/request/DiscountRequestDto';

@Injectable()
export class DiscountMoneyValidator {
  constructor(@InjectRepository(SaleTypeORM) private saleRepository: Repository<SaleTypeORM>) {
  }

  public async validate(discountRequestDto: DiscountRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const saleId: number = discountRequestDto.saleId;
    if(saleId == null){
      notification.addError('Sale id is required', null);
    }
    if(notification.hasErrors()){
      return notification;
    }
    const saleTypeORM: SaleTypeORM = await this.saleRepository.createQueryBuilder()
      .where("id = :idSale")
      .setParameter("idSale", saleId)
      .getOne();
    if(saleTypeORM == null){
      notification.addError("Sale id is not found", null);
    }
    const discount: number = discountRequestDto.discount;
    if(discount <= 0){
      notification.addError("Discount must be greater than zero", null);
    }
    return notification;
  }

}