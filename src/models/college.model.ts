import {Entity, hasMany, model, property} from '@loopback/repository';
import {Alumni} from './alumni.model';

@model({settings: {strict: false}})
export class College extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  img?: string;

  @property({
    type: 'string',
  })
  created?: string;

  @hasMany(() => Alumni)
  alumni: Alumni[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<College>) {
    super(data);
  }
}

export interface CollegeRelations {
  // describe navigational properties here
}

export type CollegeWithRelations = College & CollegeRelations;
