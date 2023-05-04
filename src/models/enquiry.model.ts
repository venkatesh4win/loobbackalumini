import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Alumni} from './alumni.model';

@model({settings: {strict: false}})
export class Enquiry extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',

  })
  inquiry_type?: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  follow_up?: string;

  @property({
    type: 'string',
  })
  flag?: string;

  @property({
    type: 'string',
  })
  notes?: string;
  @property({
    type: 'string',
  })
  created?: string;

  @belongsTo(() => Alumni)
  alumniId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Enquiry>) {
    super(data);
  }
}

export interface EnquiryRelations {
  // describe navigational properties here
}

export type EnquiryWithRelations = Enquiry & EnquiryRelations;
