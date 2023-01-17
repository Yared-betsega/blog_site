import supertest from 'supertest';
import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import { app } from '../../server';
import Information from './information.model';

jest.setTimeout(50000);
describe('Information API tes:', () => {
  const informationId = new mongoose.Types.ObjectId();
  const nonExistingId = '5fb41302700b9743133fcd41';
  const invalidId = '5fb41302700b9743133';
  beforeEach(async () => {
    const information = new Information({
      _id: informationId,
      title: 'Test title',
      note: 'This is the note for the test information',
      phase: 'Phase-1',
    });
    await information.save();
  });
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await Information.findByIdAndDelete(informationId);
  });
  jest.setTimeout(30000);
  describe('Get information', () => {
    it('Should fetch all information', async () => {
      const response = await supertest(app).get('/api/information/');
      expect(response.body.data).not.toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });

    it('Should fetch information by Id -valid id', async () => {
      const response = await supertest(app).get(`/api/information/${informationId}`);
      expect(response.body.data).not.toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });

    it('Should fetch  information by id -invalid id', async () => {
      const response = await supertest(app).get(`/api/information/${invalidId}`);
      expect(response.body.data).not.toBeNull();
      expect(response.body.statusCode).toBe(400);
      expect(response.text).toContain('Invalid ID');
    });
    it('Should fetch  information by id -non existing id', async () => {
      const response = await supertest(app).get(`/api/information/${nonExistingId}`);
      expect(response.body.data).not.toBeNull();
      expect(response.body.statusCode).toBe(404);
      expect(response.text).toContain('Information not found');
    });
  });

  describe('POST information', () => {
    const informationObject = {
      title: 'Project Launch',
      note: 'Tracksym will be launched',
      phase: 'Phase-1',
    };
    it('Should add a new information with out description', async () => {
      const response = await supertest(app).post('/api/information/').send(informationObject);
      expect(response.body.data).not.toBeNull();
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toBeInstanceOf(Object);
      await Information.findByIdAndDelete(response.body._id);
    });
    it('It should add information with description text', async () => {
      const informationObject = {
        title: 'Project Launch',
        note: 'Tracksym will be launched',
        description: 'All team mates must attend',
        phase: 'Phase-1',
      };
      const response = await supertest(app).post('/api/information/').send(informationObject);
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('description');
      await Information.findByIdAndDelete(response.body._id);
    });
    it('It should add information with description text', async () => {
      const informationObject = {
        title: 'Project Launch',
        note: 'Tracksym will be launched',
        description: {
          time: '10:30 LT',
          place: 'Office 101',
        },
        phase: 'Phase-1',
      };
      const response = await supertest(app).post('/api/information/').send(informationObject);
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('description');
      await Information.findByIdAndDelete(response.body._id);
    });
    it('It should not add information with missing required attribute', async () => {
      const invalidInfoObject = {
        title: 'Project title',
      };
      const response = await supertest(app).post('/api/information/').send(invalidInfoObject);
      expect(response.body.statusCode).toBe(404);
    });
  });
  describe('PUT information ', () => {
    it('It should update information without valid attribute', async () => {
      const response = await supertest(app)
        .patch(`/api/information/${informationId}`)
        .send({ title: 'Project Launch II' });
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.title).toEqual('Project Launch II');
    });

    it('It should update information without new description attribute', async () => {
      const response = await supertest(app)
        .patch(`/api/information/${informationId}`)
        .send({ description: 'New description' });
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('description');
    });

    it('It should not update information - non-existing id', async () => {
      const response = await supertest(app)
        .patch(`/api/information/${nonExistingId}`)
        .send({ description: 'New description' });
      expect(response.body.statusCode).toBe(404);
    });

    it('It should not update information - invalid id', async () => {
      const response = await supertest(app)
        .patch(`/api/information/${invalidId}`)
        .send({ description: 'New description' });
      expect(response.body.statusCode).toBe(400);
    });
  });

  describe('DELETE information ', () => {
    it('It should delete information with existing id', async () => {
      const response = await supertest(app).delete(`/api/information/${informationId}`).send({});
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });

    it('It should not delete information - non-existing id', async () => {
      const response = await supertest(app).delete(`/api/information/234567fhdg`).send({});
      expect(response.body.statusCode).toBe(400);
    });

    it('It should not delete information - invalid id', async () => {
      const response = await supertest(app).delete(`/api/information/${invalidId}`).send({});
      expect(response.body.statusCode).toBe(400);
    });
  });
});
