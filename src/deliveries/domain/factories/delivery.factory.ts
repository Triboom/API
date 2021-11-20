import { SaleId } from "../../../sales/domain/value-objects/sale-id.value";
import { Address } from "../../../common/domain/value-objects/address.value";
import { Delivery } from "../entities/delivery.entity";
import { DeliveryId } from "../value-objects/delivery-id.value";
import { DeliveryStatus } from "../value-objects/delivery-status.value";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class DeliveryFactory {
  public static createFrom(saleId: SaleId, address: Address, estimatedDate: DateTime){
    let status: any = DeliveryStatus.create(1);
    return new Delivery(saleId, address, estimatedDate, estimatedDate, status);
  }
}