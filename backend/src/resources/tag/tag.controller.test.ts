import supertest from 'supertest';
import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import { app } from '../../server';
import Tag from './tag.model';

jest.setTimeout(50000);
describe('Tag API tes:', () => {
  const tagId = new mongoose.Types.ObjectId();
  const nonExistingId = '5fb41302700b9743133fcd41';
  const invalidId = '5fb41302700b9743133';
  beforeEach(async () => {
    const tag = new Tag({
      _id: tagId,
      title: 'Test Tag',
      description: 'This is the description for the test Tag',
    });
    await tag.save();
  });
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await Tag.collection.drop();
  });
  describe('Get Tag', () => {
    it('Should fetch all Tag', async () => {
      const response = await supertest(app).get('/api/tag/');
      expect(response.body.data).not.toBeNull();
      expect(response.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });

  describe('POST Tag', () => {
    const tagObject = {
      title: 'tag test 1',
    };
    it('Should add a new Tag with out description', async () => {
      const response = await supertest(app).post('/api/tag/').send(tagObject);
      expect(response.body.data).not.toBeNull();
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toBeInstanceOf(Object);
      await Tag.findByIdAndDelete(response.body.data._id);
    });
    it('It should add Tag with description text', async () => {
      const tagObject = {
        title: 'Tag test',
        description: 'post tag with description',
      };
      const response = await supertest(app).post('/api/tag/').send(tagObject);
      expect(response.body.statusCode).toBe(201);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('description');
      await Tag.findByIdAndDelete(response.body.data._id);
    });

    it('It should not add Tag with missing required attribute', async () => {
      const invalidInfoObject = {
        description: 'tag with out title',
      };
      const response = await supertest(app).post('/api/tag/').send(invalidInfoObject);
      expect(response.body.statusCode).toBe(404);
    });
  });
  describe('PUT Tag ', () => {
    it('It should update Tag without valid attribute', async () => {
      const response = await supertest(app).patch(`/api/Tag/${tagId}`).send({ title: 'test tag updated' });
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data.title).toEqual('test tag updated');
    });

    it('It should update Tag with new description attribute', async () => {
      const response = await supertest(app).patch(`/api/tag/${tagId}`).send({ description: 'New description for tag' });
      expect(response.body.statusCode).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty('description');
    });

    it('It should not update Tag - non-existing id', async () => {
      const response = await supertest(app)
        .patch(`/api/tag/${nonExistingId}`)
        .send({ description: 'New description for tag' });
      expect(response.body.statusCode).toBe(404);
    });

    it('It should not update Tag - invalid id', async () => {
      const response = await supertest(app)
        .patch(`/api/tag/${invalidId}`)
        .send({ description: 'New description for tag' });
      expect(response.body.statusCode).toBe(400);
    });
  });
});
