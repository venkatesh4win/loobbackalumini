import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Alumni, AlumniRelations, Enquiry} from '../models';
import {EnquiryRepository} from './enquiry.repository';

export class AlumniRepository extends DefaultCrudRepository<
  Alumni,
  typeof Alumni.prototype.id,
  AlumniRelations
> {

  public readonly enquiries: HasManyRepositoryFactory<Enquiry, typeof Alumni.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('EnquiryRepository') protected enquiryRepositoryGetter: Getter<EnquiryRepository>,
  ) {
    super(Alumni, dataSource);
    this.enquiries = this.createHasManyRepositoryFactoryFor('enquiries', enquiryRepositoryGetter,);
    this.registerInclusionResolver('enquiries', this.enquiries.inclusionResolver);
  }
}
