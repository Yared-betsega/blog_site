import Information from './information.model';
import { connect } from '../../utils/db/setupDB';
import mongoose from 'mongoose';

describe('Information Model', () => {
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
        await Information.create({
          _id: new mongoose.Types.ObjectId(),
          description: 'Test title',
          note: 'This is the note for the test information',
          phase: 'Phase-1',
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
        await Information.create({
          _id: new mongoose.Types.ObjectId(),
          title: 'Test title',
          note: 'This is the note for the test information',
          description: 'This is the description for the test information',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
    it('Should throw note is required minimum length of 10 errors', async () => {
      let err;
      try {
        await Information.create({
          _id: new mongoose.Types.ObjectId(),
          title: 'Test title',
          note: 'This',
          description: 'This is the description for the test information',
          phase: 'project phase',
        });
      } catch (error) {
        if (error instanceof Error) {
          err = error;
        }
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err?.name).toBeDefined();
    });
  });
});
