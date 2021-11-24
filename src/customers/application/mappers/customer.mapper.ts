import { Customer } from '../../domain/entities/customer.entity';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { CustomerIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';

export class CustomerMapper {
  public static toTypeORM(customer: Customer): CustomerTypeORM {
    const customerTypeORM: CustomerTypeORM = new CustomerTypeORM();
    //customerTypeORM.id = CustomerIdTypeORM.from(customer.getId().getValue());
    customerTypeORM.name = NameTypeORM.from(customer.getName().getFirstName(), customer.getName().getLastName());
    customerTypeORM.dni = DniTypeORM.from(customer.getDni().getValue());
    return customerTypeORM;
  }
}
