import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetDeliveriesQuery } from "../../queries/get-deliveries.query";
import { getManager } from "typeorm";
import { GetDeliveriesDto } from "../../dtos/queries/get-deliveries.dto";

@QueryHandler(GetDeliveriesQuery)
export class GetDeliveriesHandler implements IQueryHandler<GetDeliveriesQuery>{
  constructor() {}

  async execute(query: GetDeliveriesQuery){
    const manager = getManager();
    const sql =`
        SELECT 
          id,
          saleId,
          address,
          district,
          estimatedDate,
          deliveryDate,
          deliveryStatus
        FROM
          deliveries;`;
    const ormDeliveries = await manager.query(sql);
    if (ormDeliveries.length <=0){
      return []
    }
    const deliveries: GetDeliveriesDto = ormDeliveries.map(function(ormDeliveries) {
      let deliveryDto = new GetDeliveriesDto();
      deliveryDto.id = Number(ormDeliveries.id);
      deliveryDto.saleId = ormDeliveries.saleId;
      deliveryDto.address = ormDeliveries.address;
      deliveryDto.district = ormDeliveries.district;
      deliveryDto.estimatedDeliveryDate = ormDeliveries.estimatedDeliveryDate;
      deliveryDto.deliveryDate = ormDeliveries.deliveryDate;
      deliveryDto.deliveryStatus = ormDeliveries.deliveryStatus;
      return deliveryDto;
    });
    return  deliveries;
  }
}