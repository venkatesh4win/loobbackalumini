import {Entity, model, property, hasMany} from '@loopback/repository';
import {Enquiry} from './enquiry.model';

@model({settings: {strict: false}})
export class Alumni extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  dob?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phonenumber?: string;

  @property({
    type: 'string',
  })
  star?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  degree?: string;

  @property({
    type: 'string',
  })
  major?: string;

  @property({
    type: 'number',
  })
  year?: number;

  @property({
    type: 'string',
  })
  employee_type?: string;

  @property({
    type: 'string',
  })
  company_name?: string;

  @property({
    type: 'string',
  })
  job_title?: string;

  @property({
    type: 'string',
  })
  created?: string;

  @hasMany(() => Enquiry)
  enquiries: Enquiry[];

  @property({
    type: 'number',
  })
  collegeId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Alumni>) {
    super(data);
  }
}

export interface AlumniRelations {
  // describe navigational properties here
}

export type AlumniWithRelations = Alumni & AlumniRelations;
