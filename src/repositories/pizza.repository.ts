import { DefaultCrudRepository } from '@loopback/repository';
import { Pizza, PizzaRelations } from '../models';
import { PizzaDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class PizzaRepository extends DefaultCrudRepository<
  Pizza,
  typeof Pizza.prototype._id,
  PizzaRelations
  > {
  constructor(
    @inject('datasources.Pizza') dataSource: PizzaDataSource,
  ) {
    super(Pizza, dataSource);
  }
}
