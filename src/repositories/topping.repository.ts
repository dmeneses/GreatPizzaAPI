import {DefaultCrudRepository} from '@loopback/repository';
import {Topping, ToppingRelations} from '../models';
import {PizzaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ToppingRepository extends DefaultCrudRepository<
  Topping,
  typeof Topping.prototype._id,
  ToppingRelations
> {
  constructor(
    @inject('datasources.Pizza') dataSource: PizzaDataSource,
  ) {
    super(Topping, dataSource);
  }
}
