import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customers/domain/entities/customer.entity';
import { RegisterCustomerCommand } from 'src/customers/application/commands/register-customer.command';
import { Repository } from 'typeorm';
import { CustomerFactory } from '../../../domain/factories/customer.factory';
import { CustomerId } from '../../../domain/value-objects/customer-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { CustomerTypeORM } from '../../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { CustomerMapper } from '../../mappers/customer.mapper';

@CommandHandler(RegisterCustomerCommand)
export class RegisterCustomerHandler
  implements ICommandHandler<RegisterCustomerCommand> {
  constructor(
    @InjectRepository(CustomerTypeORM)
    private customerRepository: Repository<CustomerTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterCustomerCommand) {
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return 0;
    }
    const nameResult: Result<AppNotification, Name> = Name.create(command.firstName, command.lastName);
    if (nameResult.isFailure()) {
      return 0;
    }
    let customer: Customer = CustomerFactory.createFrom(nameResult.value, dniResult.value);
    let customerTypeORM = CustomerMapper.toTypeORM(customer);
    customerTypeORM = await this.customerRepository.save(customerTypeORM);
    if (customerTypeORM == null) {
      return 0;
    }
    const customerId:number = Number(customerTypeORM.id.value);
    customer.changeId(CustomerId.createCustomer(customerId));
    customer = this.publisher.mergeObjectContext(customer);
    customer.register();
    customer.commit();
    return customerId;
  }
}