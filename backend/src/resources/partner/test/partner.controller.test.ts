import { app } from '../../../server';
import mongoose from 'mongoose';
import { Partner } from '../partner.model';
import { connect } from '../../../utils/db/setupDB';
import supertest from 'supertest';

let partnerId: mongoose.Types.ObjectId;
const invalidId = '1234';
const partnerData = {
  name: 'Test',
  slug: 'Test slug',
  banner: 'test banner',
  logo_sm: 'test logo_sm',
  logo_lg: 'test logo_lg',
  website: 'test website',
};

beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  const newValidPartner = new Partner(partnerData);
  const saveValidPartner = await newValidPartner.save();
  partnerId = saveValidPartner._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});
jest.setTimeout(900000);

describe('Get api/partner', () => {
  it('Should return all partner data', async () => {
    const response = await supertest(app).get('/api/partner').expect(200);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should fetch information by id', async () => {
    const response = await supertest(app).get(`/api/partner/${partnerId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('Should return error when invalid id is given', async () => {
    const response = await supertest(app).get(`/api/partner/${invalidId}`);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toContain('Please enter a valid ID');
  });
  it('Should create new partner', async () => {
    const partnerData = {
      name: 'Test',
      slug: 'Test slug',
      banner: 'test banner',
      logo_sm: 'test logo_sm',
      logo_lg: 'test logo_lg',
      website: 'test website',
    };

    const response = await supertest(app).post(`/api/partner/`).send(partnerData);
    expect(response.body.data).not.toBeNull();
    expect(response.body.statusCode).toBe(201);
    expect(response.body.data).toBeInstanceOf(Object);
  });
  it('Should not add new partner if some of the required fields are missing', async () => {
    const partnerData = {
      slug: 'Test slug',
      banner: 'test banner',
      logo_sm: 'test logo_sm',
      logo_lg: 'test logo_lg',
      website: 'test website',
    };

    const response = await supertest(app).post(`/api/partner/`).send(partnerData);

    expect(response.body.statusCode).toBe(400);
  });
  it('It should update partner data', async () => {
    const response = await supertest(app).patch(`/api/partner/${partnerId}`).send({ slug: 'changed slug' });
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
    expect(response.body.data.slug).toEqual('changed slug');
  });
  it('It should not update partner data with invalid id', async () => {
    const response = await supertest(app).patch(`/api/partner/${invalidId}`).send({ slug: 'invalid change' });
    expect(response.body.statusCode).toBe(400);
  });

  it('It should delete partner with valid id', async () => {
    const response = await supertest(app).delete(`/api/partner/${partnerId}`);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Object);
  });

  it('It should not delete partner with invalid id', async () => {
    const response = await supertest(app).delete(`/api/team/${invalidId}`);
    expect(response.body.statusCode).toBe(400);
  });
  it('It should not delete partner with non existant id', async () => {
    const newId = new mongoose.Types.ObjectId();
    const response = await supertest(app).delete(`/api/partner/${newId}`);
    expect(response.body.statusCode).toBe(404);
    expect(response.body.data).toBeUndefined();
  });
});
