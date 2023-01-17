import mongoose from 'mongoose';
import { connect } from '../../utils/db/setupDB';
import SuccessStoryResource, { Content, Placement } from './successStory.model';
jest.setTimeout(50000);

describe('Impact Story Resource Model tes:', () => {
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
    await content.save();
    await placement.save();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Model testing', () => {
    it('Should throw name is required errors', async () => {
      let err;
      try {
        await SuccessStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          title: 'Development',
          placement: placement._id,
          image: 'fakeimage.png',
          content: content._id,
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
        await SuccessStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          name: 'Tigist',
          placement: placement._id,
          image: 'fakeimage.png',
          content: content._id,
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
        await SuccessStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          name: 'user',
          title: 'Development',
          placement: placement._id,
          content: content._id,
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should create success story', async () => {
      let err;
      try {
        await SuccessStoryResource.create({
          _id: new mongoose.Types.ObjectId(),
          placement: placement._id,
          name: 'User',
          image: 'fake.png',
          title: 'Development',
          content: content._id,
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
