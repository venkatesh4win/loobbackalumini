import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Alumni, College, CollegeRelations} from '../models';
import {AlumniRepository} from './alumni.repository';

export class CollegeRepository extends DefaultCrudRepository<
  College,
  typeof College.prototype.id,
  CollegeRelations
> {

  public readonly alumni: HasManyRepositoryFactory<Alumni, typeof College.prototype.id>;

  constructor(
    @inject('datasources.Mongo') dataSource: MongoDataSource, @repository.getter('AlumniRepository') protected alumniRepositoryGetter: Getter<AlumniRepository>,
  ) {
    super(College, dataSource);
    this.alumni = this.createHasManyRepositoryFactoryFor('alumni', alumniRepositoryGetter,);
    this.registerInclusionResolver('alumni', this.alumni.inclusionResolver);
  }
}
