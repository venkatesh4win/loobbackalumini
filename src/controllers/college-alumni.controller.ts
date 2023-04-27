import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  College,
  Alumni,
} from '../models';
import {CollegeRepository} from '../repositories';

export class CollegeAlumniController {
  constructor(
    @repository(CollegeRepository) protected collegeRepository: CollegeRepository,
  ) { }

  @get('/colleges/{id}/alumni', {
    responses: {
      '200': {
        description: 'Array of College has many Alumni',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumni)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Alumni>,
  ): Promise<Alumni[]> {
    return this.collegeRepository.alumni(id).find(filter);
  }

  @post('/colleges/{id}/alumni', {
    responses: {
      '200': {
        description: 'College model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alumni)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof College.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumni, {
            title: 'NewAlumniInCollege',
            exclude: ['id'],
            optional: ['collegeId']
          }),
        },
      },
    }) alumni: Omit<Alumni, 'id'>,
  ): Promise<Alumni> {
    return this.collegeRepository.alumni(id).create(alumni);
  }

  @patch('/colleges/{id}/alumni', {
    responses: {
      '200': {
        description: 'College.Alumni PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumni, {partial: true}),
        },
      },
    })
    alumni: Partial<Alumni>,
    @param.query.object('where', getWhereSchemaFor(Alumni)) where?: Where<Alumni>,
  ): Promise<Count> {
    return this.collegeRepository.alumni(id).patch(alumni, where);
  }

  @del('/colleges/{id}/alumni', {
    responses: {
      '200': {
        description: 'College.Alumni DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Alumni)) where?: Where<Alumni>,
  ): Promise<Count> {
    return this.collegeRepository.alumni(id).delete(where);
  }
}
