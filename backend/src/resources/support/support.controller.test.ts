import { Support } from './support.model';
import { connect } from '../../utils/db/setupDB';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../server';

const person1Id = new mongoose.Types.ObjectId();
const person1 = {
  _id: person1Id,
  name: 'Selam',
  email: 'Selam@gmail.com',
  way: 'Q&A',
  experience: 'Software Engineer at Google',
};
const person1WithoutId = {
  name: 'Selam',
  email: 'Selam@gmail.com',
  way: 'Q&A',
  experience: 'Software Engineer at Google',
};
const person2 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Hiwot',
  email: 'hiwot@gmail.com',
  way: 'Other',
  experience: 'Intership at palantir',
};
const person1WithoutId2 = {
  name: 'Hiwot',
  email: 'hiwot@gmail.com',
  way: 'Other',
  experience: 'Intership at palantir',
};
const person3 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Beza',
  email: 'Beza@gmail.com',
  way: 'Mentor',
  experience: 'Full time at Amazon',
};

jest.setTimeout(50000);

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});
beforeEach(async () => {
  const cont1 = new Support(person1);
  const cont2 = new Support(person2);
  const cont3 = new Support(person3);

  await cont1.save();
  await cont2.save();
  await cont3.save();
});

afterEach(async () => {
  await Support.collection.drop();
});

describe('Support controller testing', () => {
  it('should fetch all Supports', async () => {
    const result = await request(app).get('/api/support/getAllSupport');
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(3);
    expect(result.body.data[0].name).toBe(person1.name);
    expect(result.body.data[1].name).toBe(person2.name);
    expect(result.body.data[2].name).toBe(person3.name);
  });

  it('should fetch a support by correct id', async () => {
    const result = await request(app).get(`/api/support/getSupportById/${person1._id}`);
    expect(result.status).toBe(200);

    const { name, experience, way, email } = result.body.data;
    expect({ name, experience, way, email }).toStrictEqual(person1WithoutId);
  });
  it('should add a support to database', async () => {
    const result = await request(app).post(`/api/support/postSupport`).send(person1WithoutId);

    expect(result.status).toBe(200);

    const { name, experience, way, email } = result.body.data;
    expect({ name, experience, way, email }).toStrictEqual(person1WithoutId);
  });
  it('should update a support to database', async () => {
    const result = await request(app).patch(`/api/support/updateSupport/${person1Id}`).send(person1WithoutId2);

    expect(result.status).toBe(200);

    const { name, experience, way, email } = result.body.data;
    expect({ name, experience, way, email }).toStrictEqual(person1WithoutId2);
  });
  it('should delete a support from database', async () => {
    const result = await request(app).delete(`/api/support/deleteSupport/${person1._id}`);

    expect(result.status).toBe(200);

    expect(result.body.data).toBeNull();
  });
});
