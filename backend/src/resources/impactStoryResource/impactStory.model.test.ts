import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import ImpactStoryResource from './impactStoryResource.model';
jest.setTimeout(50000);
describe('Impact Story Resource Model tes:', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Model testing', () => {
    it('Should throw name is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          phase: 'First',
          title: 'Development',
          image: 'fakeimage.png',
          content: 'New content is added',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw title is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          phase: 'First',
          name: 'Tigist',
          image: 'fakeimage.png',
          content: 'New content is added',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw phase is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          name: 'First',
          title: 'Development',
          image: 'fakeimage.png',
          content: 'New content is added',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw content is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          phase: 'First',
          name: 'user',
          title: 'Development',
          image: 'fakeimage.png',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw image is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          phase: 'First',
          name: 'User',
          title: 'Development',
          content: 'New content is added',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw image is required errors', async () => {
      let err;
      try {
        await ImpactStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          phase: 'First',
          name: 'User',
          image: 'fake.png',
          title: 'Development',
          content: 'New content is added',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err?.name).toBeUndefined();
    });
  });
});
