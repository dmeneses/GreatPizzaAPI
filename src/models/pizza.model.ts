import { Entity, model, property } from '@loopback/repository';
import { Topping } from './topping.model';

@model({ settings: { strict: false } })
export class Pizza extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true
  })
  _id: string;

  @property({
    type: 'string',
    generated: false,
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: 'string'
  })
  toppingIds?: string[];

  @property({
    type: 'array',
    itemType: 'object'
  })
  toppings?: Topping[];

  [prop: string]: any;

  constructor(data?: Partial<Pizza>) {
    super(data);
  }
}

export interface PizzaRelations {
  // describe navigational properties here
}

export type PizzaWithRelations = Pizza & PizzaRelations;
