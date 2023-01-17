import { app } from '../../../server';
import mongoose from 'mongoose';
import { Event } from '../event.model';
import { connect } from '../../../utils/db/setupDB';
import supertest from 'supertest';
let eventId: mongoose.Types.ObjectId;
const invalidId = '12334';
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

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  const newValidEvent = new Event(eventData);
  const saveValidEvent = await newValidEvent.save();
  eventId = saveValidEvent._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});
jest.setTimeout(30000);

describe('Get api/event', () => {
  it('should return all data', async () => {
    const response = await supertest(app).get('/api/event').expect(200);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should fetch information by Id', async () => {
    const response = await supertest(app).get(`/api/event/${eventId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should return error when invalid id is given', async () => {
    const response = await supertest(app).get(`/api/event/${invalidId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toContain("Please enter a valid ID");
  });
  it('Should   create new event', async () => {
    const eventData = {
        name: 'Test',
        title: 'Test title',
        eventType: 'CONTEST',
        start: Date.now(),
        end: Date.now(),
        description: 'Test Description',
        phase: 'Test phase',
      };
    
    const response = await supertest(app).post(`/api/event/`).send(eventData);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(201);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should not  add new team if some of the required fields are missing', async () => {
    const eventData = {
        title: 'Test title',
        eventType: 'CONTEST',
        start: Date.now(),
        end: Date.now(),
        description: 'Test Description',
        location: 'Test location',
        phase: 'Test phase',
      };
    
    const response = await supertest(app).post(`/api/event/`).send(eventData);

    expect(response.body.statusCode).toBe(400);
  });
  it('It should update event data', async () => {
    const response = await supertest(app).put(`/api/event/${eventId}`).send({ title: "changed title" });
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.title).toEqual('changed title');
  });
  it('It should not update team data with  invalid id', async () => {
    const response = await supertest(app).put(`/api/event/${invalidId}`).send({ title: 'invalid change' });
    expect(response.body.statusCode).toBe(400);
  });

  it('It should delete event with valid id', async () => {
    const response = await supertest(app).delete(`/api/event/${eventId}`);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('It should not delete event with  invalid id', async () => {
    const response = await supertest(app).delete(`/api/team/${invalidId}`);
    expect(response.body.statusCode).toBe(400);
  });
  it('It should not delete event with non existant id', async () => {
    const newId = new mongoose.Types.ObjectId();
    const response = await supertest(app).delete(`/api/event/${newId}`);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
  });
});