import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Topping extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Topping>) {
    super(data);
  }
}

export interface ToppingRelations {
  // describe navigational properties here
}

export type ToppingWithRelations = Topping & ToppingRelations;
