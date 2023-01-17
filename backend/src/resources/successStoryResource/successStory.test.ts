import supertest from 'supertest';
import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import app from '../../server';
import SuccessStoryResource, { Content, Placement } from './successStory.model';
jest.setTimeout(50000);
describe('success Story Resource API tes:', () => {
  const content = new Content({
    experience: '3 years',
    doingNow: 'Yes',
    lifeChange: 'Intersting opportunity',
  });
  const placement = new Placement({
    country: 'England',
    city: 'London',
    company: 'Google',
  });
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  afterEach(async () => {
    await SuccessStoryResource.findByIdAndDelete(success._id);
  });

  const success = {
    _id: new mongoose.Types.ObjectId(),
    name: 'item',
    placement: placement._id,
    title: 'title',
    image: 'fakeimage.png',
    content: content._id,
  };
  describe('Post and GetAll end points', () => {
    it('Should add a new success story resource', async () => {
      await placement.save();
      await content.save();
      const response = await supertest(app).post('/api/success/add').send(success);
      expect(response.body.data).not.toBeNull();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
    it('Should fetch success stories by the given title and phase', async () => {
      const response = await supertest(app).get('/api/success/?title=Development&&name=item');
      expect(response.body.data).not.toBeNull();
      expect(response.status).toBe(200);
      expect(response.body.data).toBeInstanceOf(Object);
    });
  });
});
