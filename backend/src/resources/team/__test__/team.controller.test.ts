import { app } from '../../../server';
import mongoose from 'mongoose';
import { Team } from '../team.model';
import { connect } from '../../../utils/db/setupDB';
import { PlacementSchema } from '../placement.model';
import supertest from 'supertest';
import { request } from 'express';
let informationId: mongoose.Types.ObjectId;
const invalidId = '12334';
const teamData = {
  name: 'abebe',
  email: 'abebe@gmail.com',
  image: 'qwresa',
  linkedin: 'wersda',
  description: 'staff',
  country: 'a.a',
  title: 'done',
};

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  const newValidTeam = new Team(teamData);
  const savedValidTeam = await newValidTeam.save();
  informationId = savedValidTeam._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});
jest.setTimeout(30000);

describe('Get api/team', () => {
  it('should return all data', async () => {
    const response = await supertest(app).get('/api/team').expect(200);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should fetch information by Id', async () => {
    const response = await supertest(app).get(`/api/team/${informationId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should fetch  information by invalid id', async () => {
    const response = await supertest(app).get(`/api/team/${invalidId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(400);
    expect(response.text).toContain('Invalid ID');
  });
  it('Should   add new team', async () => {
    const newData = {
      name: 'abebe',
      email: 'abebe@gmail.com',
      image: 'qwresa',
      linkedin: 'wersda',
      description: 'staff',
      country: 'a.a',
      title: 'done',
    };
    const response = await supertest(app).post(`/api/team/`).send(newData);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should not  add new team if a data is missing', async () => {
    const newData = {
      email: 'abebe@gmail.com',
      image: 'qwresa',
      linkedin: 'wersda',
      description: 'staff',
      country: 'a.a',
      title: 'done',
    };
    const response = await supertest(app).post(`/api/team/`).send(newData);

    expect(response.body.statusCode).toBe(400);
  });
  it('It should update team data', async () => {
    const response = await supertest(app).put(`/api/team/${informationId}`).send({ email: 'hhty@ji.com' });
    console.log(response);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.email).toEqual('hhty@ji.com');
  });
  it('It should not update team data with  invalid id', async () => {
    const response = await supertest(app).put(`/api/team/${invalidId}`).send({ description: 'description' });
    expect(response.body.statusCode).toBe(400);
  });

  it('It should delete information with valid id', async () => {
    const response = await supertest(app).delete(`/api/team/${informationId}`);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('It should not delete information with  invalid id', async () => {
    const response = await supertest(app).delete(`/api/team/${invalidId}`);
    expect(response.body.statusCode).toBe(400);
  });
  it('It should not delete information with non existant id', async () => {
    const newId = new mongoose.Types.ObjectId();
    const response = await supertest(app).delete(`/api/team/${newId}`);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeNull();
  });
});
