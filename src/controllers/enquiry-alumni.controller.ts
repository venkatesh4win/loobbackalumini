import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Enquiry,
  Alumni,
} from '../models';
import {EnquiryRepository} from '../repositories';

export class EnquiryAlumniController {
  constructor(
    @repository(EnquiryRepository)
    public enquiryRepository: EnquiryRepository,
  ) { }

  @get('/enquiries/{id}/alumni', {
    responses: {
      '200': {
        description: 'Alumni belonging to Enquiry',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumni)},
          },
        },
      },
    },
  })
  async getAlumni(
    @param.path.string('id') id: typeof Enquiry.prototype.id,
  ): Promise<Alumni> {
    return this.enquiryRepository.alumni(id);
  }
}
