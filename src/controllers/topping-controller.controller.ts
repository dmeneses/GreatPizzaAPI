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
import {Topping} from '../models';
import {ToppingRepository} from '../repositories';

export class ToppingControllerController {
  constructor(
    @repository(ToppingRepository)
    public toppingRepository : ToppingRepository,
  ) {}

  @post('/toppings', {
    responses: {
      '200': {
        description: 'Topping model instance',
        content: {'application/json': {schema: getModelSchemaRef(Topping)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topping, {
            title: 'NewTopping',
            exclude: ['_id'],
          }),
        },
      },
    })
    topping: Omit<Topping, '_id'>,
  ): Promise<Topping> {
    return this.toppingRepository.create(topping);
  }

  @get('/toppings/count', {
    responses: {
      '200': {
        description: 'Topping model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Topping)) where?: Where<Topping>,
  ): Promise<Count> {
    return this.toppingRepository.count(where);
  }

  @get('/toppings', {
    responses: {
      '200': {
        description: 'Array of Topping model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Topping, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Topping)) filter?: Filter<Topping>,
  ): Promise<Topping[]> {
    return this.toppingRepository.find(filter);
  }

  @patch('/toppings', {
    responses: {
      '200': {
        description: 'Topping PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topping, {partial: true}),
        },
      },
    })
    topping: Topping,
    @param.query.object('where', getWhereSchemaFor(Topping)) where?: Where<Topping>,
  ): Promise<Count> {
    return this.toppingRepository.updateAll(topping, where);
  }

  @get('/toppings/{id}', {
    responses: {
      '200': {
        description: 'Topping model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Topping, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Topping)) filter?: Filter<Topping>
  ): Promise<Topping> {
    return this.toppingRepository.findById(id, filter);
  }

  @patch('/toppings/{id}', {
    responses: {
      '204': {
        description: 'Topping PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Topping, {partial: true}),
        },
      },
    })
    topping: Topping,
  ): Promise<void> {
    await this.toppingRepository.updateById(id, topping);
  }

  @put('/toppings/{id}', {
    responses: {
      '204': {
        description: 'Topping PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() topping: Topping,
  ): Promise<void> {
    await this.toppingRepository.replaceById(id, topping);
  }

  @del('/toppings/{id}', {
    responses: {
      '204': {
        description: 'Topping DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.toppingRepository.deleteById(id);
  }
}
