import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Alumni, Enquiry, EnquiryRelations} from '../models';
import {AlumniRepository} from './alumni.repository';

export class EnquiryRepository extends DefaultCrudRepository<
  Enquiry,
  typeof Enquiry.prototype.id,
  EnquiryRelations
> {

  public readonly alumni: BelongsToAccessor<Alumni, typeof Enquiry.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('AlumniRepository') protected alumniRepositoryGetter: Getter<AlumniRepository>,
  ) {
    super(Enquiry, dataSource);
    this.alumni = this.createBelongsToAccessorFor('alumni', alumniRepositoryGetter,);
    this.registerInclusionResolver('alumni', this.alumni.inclusionResolver);
  }
}
