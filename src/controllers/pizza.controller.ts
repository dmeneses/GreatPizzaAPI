import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Pizza } from '../models';
import { PizzaRepository } from '../repositories';
import { ToppingRepository } from '../repositories/topping.repository';

export class PizzaController {
  constructor(
    @repository(PizzaRepository)
    public pizzaRepository: PizzaRepository,
    @repository(ToppingRepository)
    public toppingRepository: ToppingRepository,
  ) { }

  @post('/pizzas', {
    responses: {
      '200': {
        description: 'Pizza model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Pizza) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, {
            title: 'NewPizza',
            exclude: ['_id'],
          }),
        },
      },
    })
    pizza: Omit<Pizza, '_id'>,
  ): Promise<Pizza> {
    return this.pizzaRepository.create(pizza);
  }

  @get('/pizzas/count', {
    responses: {
      '200': {
        description: 'Pizza model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.pizzaRepository.count(where);
  }

  @get('/pizzas', {
    responses: {
      '200': {
        description: 'Array of Pizza model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pizza, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pizza)) filter?: Filter<Pizza>,
  ): Promise<Pizza[]> {
    return this.pizzaRepository.find({ fields: { toppingIds: false }, ...filter });
  }

  @patch('/pizzas', {
    responses: {
      '200': {
        description: 'Pizza PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, { partial: true }),
        },
      },
    })
    pizza: Pizza,
    @param.query.object('where', getWhereSchemaFor(Pizza)) where?: Where<Pizza>,
  ): Promise<Count> {
    return this.pizzaRepository.updateAll(pizza, where);
  }

  @get('/pizzas/{id}', {
    responses: {
      '200': {
        description: 'Pizza model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pizza, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Pizza)) filter?: Filter<Pizza>
  ): Promise<Pizza> {
    const pizza = await this.pizzaRepository.findById(id, filter);
    const toppings = await this.toppingRepository.find({ where: { _id: { inq: pizza.toppingIds } } });
    pizza.toppings = toppings;
    pizza.toppingIds = undefined;
    return pizza;
  }

  @patch('/pizzas/{id}', {
    responses: {
      '204': {
        description: 'Pizza PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pizza, { partial: true }),
        },
      },
    })
    pizza: Pizza,
  ): Promise<void> {
    await this.pizzaRepository.updateById(id, pizza);
  }

  @put('/pizzas/{id}', {
    responses: {
      '204': {
        description: 'Pizza PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pizza: Pizza,
  ): Promise<void> {
    await this.pizzaRepository.replaceById(id, pizza);
  }

  @del('/pizzas/{id}', {
    responses: {
      '204': {
        description: 'Pizza DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pizzaRepository.deleteById(id);
  }

  @put('/pizzas/{pizzaId}/topping/{toppingId}', {
    responses: {
      '204': {
        description: 'Pizza PUT success',
      },
    },
  })
  async addTopping(
    @param.path.string('pizzaId') pizzaId: string,
    @param.path.string('toppingId') toppingId: string
  ): Promise<void> {
    const pizza = await this.pizzaRepository.findById(pizzaId);
    const toppings = pizza.toppingIds || [];
    toppings.push(toppingId);
    await this.pizzaRepository.updateById(pizzaId, { toppingIds: toppings });
  }
}
