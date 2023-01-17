import supertest from 'supertest';
import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import app from '../../server';
import ImpactStoryResource from './impactStoryResource.model';
jest.setTimeout(50000);
describe('Impact Story Resource API tes:', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await ImpactStoryResource.findByIdAndDelete(impact._id);
  });
  const impact = {
    _id: new mongoose.Types.ObjectId(),
    name: 'New item',
    phase: 'First',
    title: 'Development',
    image: 'fakeimage.png',
    content: 'New content is added',
  };
  describe('Post and GetAll end points', () => {
    it('Should add a new impact story resource', async () => {
      const response = await supertest(app).post('/api/impact/add').send(impact);
      expect(response.body.data).not.toBeNull();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
    it('Should fetch impact stories by the given title and phase', async () => {
      const response = await supertest(app).get('/api/impacts/?title=Development&&phase=First');
      expect(response.body.data).not.toBeNull();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });
});
