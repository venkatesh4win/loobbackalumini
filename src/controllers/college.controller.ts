import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {College} from '../models';
import {CollegeRepository} from '../repositories';

export class CollegeController {
  constructor(
    @repository(CollegeRepository)
    public collegeRepository : CollegeRepository,
  ) {}

  @post('/colleges')
  @response(200, {
    description: 'College model instance',
    content: {'application/json': {schema: getModelSchemaRef(College)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(College, {
            title: 'NewCollege',
            exclude: ['id'],
          }),
        },
      },
    })
    college: Omit<College, 'id'>,
  ): Promise<College> {
    return this.collegeRepository.create(college);
  }

  @get('/colleges/count')
  @response(200, {
    description: 'College model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(College) where?: Where<College>,
  ): Promise<Count> {
    return this.collegeRepository.count(where);
  }

  @get('/colleges')
  @response(200, {
    description: 'Array of College model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(College, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(College) filter?: Filter<College>,
  ): Promise<College[]> {
    return this.collegeRepository.find(filter);
  }

  @patch('/colleges')
  @response(200, {
    description: 'College PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(College, {partial: true}),
        },
      },
    })
    college: College,
    @param.where(College) where?: Where<College>,
  ): Promise<Count> {
    return this.collegeRepository.updateAll(college, where);
  }

  @get('/colleges/{id}')
  @response(200, {
    description: 'College model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(College, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id:string,
    @param.filter(College, {exclude: 'where'}) filter?: FilterExcludingWhere<College>
  ): Promise<College> {
    return this.collegeRepository.findById(id, filter);
  }

  @patch('/colleges/{id}')
  @response(204, {
    description: 'College PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(College, {partial: true}),
        },
      },
    })
    college: College,
  ): Promise<void> {
    await this.collegeRepository.updateById(id, college);
  }

  @put('/colleges/{id}')
  @response(204, {
    description: 'College PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() college: College,
  ): Promise<void> {
    await this.collegeRepository.replaceById(id, college);
  }

  @del('/colleges/{id}')
  @response(204, {
    description: 'College DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.collegeRepository.deleteById(id);
  }
}
