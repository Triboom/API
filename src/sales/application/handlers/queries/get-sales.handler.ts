import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetSalesQuery } from '../../queries/get-sales.query';
import { GetSalesDto } from '../../dtos/queries/get-sales.dto';

@QueryHandler(GetSalesQuery)
export class GetSalesHandler implements IQueryHandler<GetSalesQuery>{
  constructor() {}

  async execute(query: GetSalesQuery){
    const manager = getManager();
    const sql = `
        SELECT 
          id,
          orderQuantity,
          orderStatus,
          dateTime
        FROM 
          sales;`;
    const ormSales = await manager.query(sql);
    if (ormSales.length <= 0) {
      return [];
    }
    const sales: GetSalesDto[] = ormSales.map(function (ormSales) {
      let saleDto = new GetSalesDto();
      saleDto.id = Number(ormSales.id);
      saleDto.orderQuantity = ormSales.orderQuantity;
      saleDto.orderStatus = ormSales.orderStatus;
      saleDto.dateTime = ormSales.dateTime;

      return saleDto;
    });
    return sales;
  }
}