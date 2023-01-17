import { Event } from '../event.model';
import mongoose from 'mongoose';
import { connect } from '../../../utils/db/setupDB';

const eventData = {
  name: 'Test',
  title: 'Test title',
  eventType: 'CONTEST',
  start: Date.now(),
  end: Date.now(),
  description: 'Test Description',
  location: 'Test location',
  phase: 'Test phase',
};

const eventData2 = {
  title: 'Test title',
  start: Date.now(),
  end: Date.now(),
  eventType: 'CONTEST',
  description: 'Test Description',
  location: 'Test location',
  phase: 'Test phase',
};

const eventData3 = {
  name: 'Test',
  start: Date.now(),
  end: Date.now(),
  eventType: 'CONTEST',
  description: 'Test Description',
  location: 'Test location',
  phase: 'Test phase',
};

const eventData4 = {
  name: 'TEST',
  title: 'Test title',
  start: '00:00',
  end: Date.now(),
  eventType: 'CONTEST',
  description: 'Test Description',
  location: 'Test location',
  phase: 'Test phase',
};

const eventData5 = {
  name: 'Test',
  title: 'Test title',
  start: Date.now(),
  eventType: 'CONTEST',
  description: 'Test Description',
  location: 'Test location',
  phase: 'Test phase',
};
describe('Event Model Test', () => {
  beforeAll(async () => {
    await connect();
  }, 30000);

  describe('Schema structure testing', () => {
    it('should return the schema of name', async () => {
      const name = Event.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
      });
    });
    it('should return the schema of title', async () => {
      const title = Event.schema.obj.title;
      expect(title).toEqual({
        type: String,
        required: true,
      });
    });
    it('should return the schema of start', async () => {
      const start = Event.schema.obj.start;
      expect(start).toEqual({
        type: Date,
        required: true,
      });
    });
    it('should return the schema of end', async () => {
      const end = Event.schema.obj.end;
      expect(end).toEqual({
        type: Date,
        required: true,
      });
    });
    it('should return the schema of eventType', async () => {
      const eventType = Event.schema.obj.eventType;
      expect(eventType).toEqual({
        type: String,
        enum: ['CONTEST', 'Q&A', 'PRODUCT RELEASE'],
        required: true,
      });
    });
    it('should return the schema of description', async () => {
      const description = Event.schema.obj.description;
      expect(description).toEqual({
        type: String,
        minlength: 10,
        required: true,
      });
    });
    it('should return the schema of location', async () => {
      const location = Event.schema.obj.location;
      expect(location).toEqual({
        type: String,
      });
    });
    it('should return the schema of links', async () => {
      const links = Event.schema.obj.links;
      expect(links).toEqual({
        type: [
          {
            name: {
              type: String,
            },
            link: {
              type: String,
            },
          },
        ],
        default: [],
      });
    });
    it('should return the schema of gallery', async () => {
      const gallery = Event.schema.obj.gallery;
      expect(gallery).toEqual({
        type: String,
      });
    });
    it('should return the schema of phase', async () => {
      const phase = Event.schema.obj.phase;
      expect(phase).toEqual({
        type: String,
        required: true,
      });
    });
  });
  describe('Valid input testing', () => {
    it('should return a valid Event model', async () => {
      const eventPrototype = eventData;
      const event = await Event.create(eventPrototype);
      expect(event).toBeDefined();
    });
    it('should return an error, given an invalid name field', async () => {
      const eventPrototype = eventData2;
      let err: any;
      const event = await Event.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.name).toBeDefined();
    });
    it('should return an error, when title is not provided', async () => {
      const eventPrototype = eventData3;
      let err: any;
      const event = await Event.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.title).toBeDefined();
    });
    it('should return an error, given an invalid start field', async () => {
      const eventPrototype = eventData4;
      let err: any;
      const event = await Event.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.start).toBeDefined();
    });

    it('should return an error, when end field is not provided', async () => {
      const eventPrototype = eventData5;
      let err: any;
      const event = await Event.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.end).toBeDefined();
    });
  });
});