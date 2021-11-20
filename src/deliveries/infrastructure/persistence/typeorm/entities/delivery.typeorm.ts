import { Column, Entity } from "typeorm";
import { DeliveryIdTypeorm } from "../value-objects/delivery-id.typeorm";
import { SaleIdTypeorm } from "../value-objects/sale-id.typeorm";
import { AddressTypeorm } from "../value-objects/address.typeorm";
import { EstimatedDeliveryDateTypeorm } from "../value-objects/estimated-delivery-date.typeorm";
import { DeliveryDateTypeorm } from "../value-objects/delivery-date.typeorm";
import { DeliveryStatusTypeorm } from "../value-objects/delivery-status.typeorm";

@Entity('deliveries')
export class DeliveryTypeorm{
  @Column((type => DeliveryIdTypeorm), { prefix: false })
  public id: DeliveryIdTypeorm;
  @Column((type => SaleIdTypeorm),{ prefix: false })
  public saleId: SaleIdTypeorm;
  @Column((type => AddressTypeorm),{ prefix: false })
  public address: AddressTypeorm;
  @Column((type => EstimatedDeliveryDateTypeorm),{ prefix: false })
  public estimatedDeliveryDate: EstimatedDeliveryDateTypeorm;
  @Column((type => DeliveryDateTypeorm),{ prefix: false })
  public deliveryDate: DeliveryDateTypeorm;
  @Column((type => DeliveryStatusTypeorm),{ prefix: false })
  public deliveryStatus: DeliveryStatusTypeorm;
}