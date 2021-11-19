import { Customer } from '../entities/customer.entity';
import { CustomerId } from '../value-objects/customer-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';

export class CustomerFactory {
  public static createFrom(name: Name, dni: Dni): Customer {
    return new Customer( name, dni);
  }

  public static withId(name: Name, dni: Dni): Customer {
    return new Customer(name, dni);
  }
}