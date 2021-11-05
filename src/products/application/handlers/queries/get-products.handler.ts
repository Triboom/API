import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetProductsQuery } from '../../queries/get-products.query';
import { GetProductsDto } from '../../dtos/queries/get-products.dto'; 

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery>{
    constructor() {}

    async execute(query: GetProductsQuery){
        const manager = getManager();
        const sql = `
        SELECT 
          id,
          name as productName,
          ammount,
          currency
        FROM 
          products
        ORDER BY
        productName;`;
        const ormProducts = await manager.query(sql);
        if (ormProducts.length <= 0) {
            return [];
        }
        const products: GetProductsDto[] = ormProducts.map(function (ormProducts) {
        let productDto = new GetProductsDto();
        productDto.id = Number(ormProducts.id);
        productDto.name = ormProducts.productName;
        productDto.ammount = ormProducts.ammount;
        productDto.currency = ormProducts.currency;

        return productDto;
    });
    return products;
    }
}