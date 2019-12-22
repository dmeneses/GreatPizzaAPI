import { Entity, model, property } from '@loopback/repository';

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
  toppings?: string[];

  [prop: string]: any;

  constructor(data?: Partial<Pizza>) {
    super(data);
  }
}

export interface PizzaRelations {
  // describe navigational properties here
}

export type PizzaWithRelations = Pizza & PizzaRelations;
