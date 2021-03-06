import { Delivery } from "../../domain/entities/delivery.entity";
import { DeliveryTypeorm } from "../../infrastructure/persistence/typeorm/entities/delivery.typeorm";
import { DeliveryIdTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/delivery-id.typeorm";
import { AddressTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/address.typeorm";
import { EstimatedDeliveryDateTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/estimated-delivery-date.typeorm";
import { DeliveryDateTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/delivery-date.typeorm";
import { DeliveryStatusTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/delivery-status.typeorm";

export class DeliveryMapper{
  public static toTypeOrm(delivery: Delivery): DeliveryTypeorm {
    const deliveryTypeOrm: DeliveryTypeorm = new DeliveryTypeorm();
    deliveryTypeOrm.saleId = DeliveryIdTypeorm.from(delivery.getSaleId().getValue());
    deliveryTypeOrm.address = AddressTypeorm.from(delivery.getAddress(),delivery.getDistrict());
    deliveryTypeOrm.estimatedDeliveryDate = EstimatedDeliveryDateTypeorm.from(delivery.getEstimatedDate().getValue());
    deliveryTypeOrm.deliveryDate = DeliveryDateTypeorm.from(delivery.getDeliveryDate().getValue());
    deliveryTypeOrm.deliveryStatus = DeliveryStatusTypeorm.from(delivery.getStatus().getValue());
    return deliveryTypeOrm;
  }
}
