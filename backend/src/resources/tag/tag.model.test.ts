import Tag from './tag.model';
import { connect } from '../../utils/db/setupDB';
import mongoose from 'mongoose';

describe('Tag Model', () => {
  beforeAll(async () => {
    await connect();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Model testing', () => {
    it('Should throw title is required errors', async () => {
      let err;
      try {
        await Tag.create({
          _id: new mongoose.Types.ObjectId(),
          description: 'Test description',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });

    it('Should create tag without description', async () => {
      let err;
      try {
        await Tag.create({
          _id: new mongoose.Types.ObjectId(),
          title: 'Test tag',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeNull;
    });
  });
});
