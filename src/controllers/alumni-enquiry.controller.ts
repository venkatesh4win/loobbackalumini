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
  Alumni,
  Enquiry,
} from '../models';
import {AlumniRepository} from '../repositories';

export class AlumniEnquiryController {
  constructor(
    @repository(AlumniRepository) protected alumniRepository: AlumniRepository,
  ) { }

  @get('/alumni/{id}/enquiries', {
    responses: {
      '200': {
        description: 'Array of Alumni has many Enquiry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Enquiry)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Enquiry>,
  ): Promise<Enquiry[]> {
    return this.alumniRepository.enquiries(id).find(filter);
  }

  @post('/alumni/{id}/enquiries', {
    responses: {
      '200': {
        description: 'Alumni model instance',
        content: {'application/json': {schema: getModelSchemaRef(Enquiry)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alumni.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {
            title: 'NewEnquiryInAlumni',
            exclude: ['id'],
            optional: ['alumniId']
          }),
        },
      },
    }) enquiry: Omit<Enquiry, 'id'>,
  ): Promise<Enquiry> {
    return this.alumniRepository.enquiries(id).create(enquiry);
  }

  @patch('/alumni/{id}/enquiries', {
    responses: {
      '200': {
        description: 'Alumni.Enquiry PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Enquiry, {partial: true}),
        },
      },
    })
    enquiry: Partial<Enquiry>,
    @param.query.object('where', getWhereSchemaFor(Enquiry)) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.alumniRepository.enquiries(id).patch(enquiry, where);
  }

  @del('/alumni/{id}/enquiries', {
    responses: {
      '200': {
        description: 'Alumni.Enquiry DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Enquiry)) where?: Where<Enquiry>,
  ): Promise<Count> {
    return this.alumniRepository.enquiries(id).delete(where);
  }
}
