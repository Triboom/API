import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CustomerIdTypeORM } from '../entities/customer.id.typeorm'
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';

@Entity('customers')
@Unique('UQ_customers_dni', ['dni.value'])
export class CustomerTypeORM {
  @Column((type) => CustomerIdTypeORM, { prefix: false })
  public id: CustomerIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}