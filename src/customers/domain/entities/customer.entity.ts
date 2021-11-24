import { CustomerRegisteredEvent } from '../events/customer-registered.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { CustomerId } from '../value-objects/customer-id.value';
//import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { Dni } from '../value-objects/dni.value';
import { Name } from '../../../common/domain/value-objects/name.value';

export class Customer extends AggregateRoot {
  private id: CustomerId;
  private name: Name;
  private dni: Dni;
  //private accountIds: AccountId[];

  public constructor(name: Name, dni: Dni) {
    super();
    this.name = name;
    this.dni = dni;
    //this.accountIds = [];
  }

  public register() {
    const event = new CustomerRegisteredEvent(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public changeId(id: CustomerId) {
    this.id = id;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}