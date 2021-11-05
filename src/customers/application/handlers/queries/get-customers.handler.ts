import { GetCustomersQuery } from '../../queries/get-customers.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetCustomersDto } from '../../dtos/queries/get-customers.dto';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor() {}

  async execute(query: GetCustomersQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      customers
    ORDER BY
      last_name, first_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetCustomersDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetCustomersDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.firstName = ormCustomer.firstName;
      customerDto.lastName = ormCustomer.lastName;
      customerDto.dni = ormCustomer.dni;
      return customerDto;
    });
    return customers;
  }
}