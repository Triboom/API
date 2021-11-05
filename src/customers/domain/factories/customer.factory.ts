import { Customer } from '../entities/customer.entity';
import { CustomerId } from '../value-objects/customer-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';

export class CustomerFactory {
  public static createFrom(name: Name, dni: Dni): Customer {
    return new Customer(CustomerId.create(0), name, dni);
  }

  public static withId(customerId: CustomerId, name: Name, dni: Dni): Customer {
    return new Customer(customerId, name, dni);
  }
}