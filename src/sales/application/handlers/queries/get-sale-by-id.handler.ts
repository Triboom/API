import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetSaleByIdQuery } from '../../queries/get-sale-by-id.query';
import { getManager } from 'typeorm';
import { GetSalesDto } from '../../dtos/queries/get-sales.dto';

@QueryHandler(GetSaleByIdQuery)
export class GetSaleByIdHandler implements IQueryHandler<GetSaleByIdQuery>{
  constructor() {}

  async execute(query: GetSaleByIdQuery){
    const manager = getManager();
    const sql = `
    SELECT
        s.id,
        s.orderQuantity,
        s.orderStatus,
        s.ammount,
        s.currency,
        s.customer_id,
        s.product_id
    FROM
        sales s
    WHERE
        s.id = ?;
    `
    const ormSales = await manager.query(sql, [query.saleId]);
    if(ormSales.length <= 0){
      return {};
    }
    const ormSale = ormSales[0];
    let saleDto = new GetSalesDto();
    saleDto.id = Number(ormSale.id);
    saleDto.orderQuantity = ormSale.orderQuantity;
    saleDto.orderStatus = ormSale.orderStatus;
    saleDto.ammount = ormSale.ammount;
    saleDto.currency = ormSale.currency;
    saleDto.customerId = ormSale.customerId;
    saleDto.productId = ormSale.productId;
    return saleDto;
  }

}