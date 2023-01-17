import { Contact } from './contact.model';
import { connect } from '../../utils/db/setupDB';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../server';

const person1Id = new mongoose.Types.ObjectId();
const person1 = {
  _id: person1Id,
  name: 'Selam',
  email: 'Selam@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};
const person1WithoutId = {
  name: 'Selam',
  email: 'Selam@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};
const person2 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Hiwot',
  email: 'hiwot@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};
const person1WithoutId2 = {
  name: 'Hiwot',
  email: 'hiwot@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};
const person3 = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Beza',
  email: 'Beza@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};

jest.setTimeout(50000);

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});
beforeEach(async () => {
  const cont1 = new Contact(person1);
  const cont2 = new Contact(person2);
  const cont3 = new Contact(person3);

  await cont1.save();
  await cont2.save();
  await cont3.save();
});

afterEach(async () => {
  await Contact.collection.drop();
});

describe('Contact controller testing', () => {
  it('should fetch all contacts', async () => {
    const result = await request(app).get('/api/contact/getAllContacts');
    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(3);
    expect(result.body.data[0].name).toBe(person1.name);
    expect(result.body.data[1].name).toBe(person2.name);
    expect(result.body.data[2].name).toBe(person3.name);
  });

  it('should fetch a contact by correct id', async () => {
    const result = await request(app).get(`/api/contact/getContactById/${person1._id}`);
    expect(result.status).toBe(200);
    const { name, message, subject, email, phase } = result.body.data;
    expect({ name, message, subject, email, phase }).toStrictEqual(person1WithoutId);
  });
  it('should add a contact to database', async () => {
    const result = await request(app).post(`/api/contact/postContact`).send(person1WithoutId);

    expect(result.status).toBe(200);

    const { name, message, subject, email, phase } = result.body.data;
    expect({ name, message, subject, email, phase }).toStrictEqual(person1WithoutId);
  });
  it('should update a contact to database', async () => {
    const result = await request(app).patch(`/api/contact/updateContact/${person1Id}`).send(person1WithoutId2);

    expect(result.status).toBe(200);

    const { name, message, subject, email, phase } = result.body.data;
    expect({ name, message, subject, email, phase }).toStrictEqual(person1WithoutId2);
  });
  it('should delete a contact from database', async () => {
    const result = await request(app).delete(`/api/contact/deleteContact/${person1._id}`);

    expect(result.status).toBe(200);

    expect(result.body.data).toBeNull();
  });
});
