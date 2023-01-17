import { Support } from './support.model';
import { connect } from '../../utils/db/setupDB';
import mongoose from 'mongoose';

jest.setTimeout(50000);
beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});

const correct = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Selam',
  email: 'Selam@gmail.com',
  way: 'Q&A',
  experience: 'Software Engineer at Google',
};
const withoutWay = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Selam',
  email: 'Selam@gmail.com',
  experience: 'Software Engineer at Google',
};
const invalidWay = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Selam',
  email: 'Selam@gmail.com',
  way: 'Assistance',
  experience: 'Software Engineer at Google',
};

describe('Support Model testing', () => {
  it('should not throw any error if everything is correct', async () => {
    let err: any = null;
    await Support.create(correct).catch((error) => {
      console.log(error);
      err = error;
    });
    expect(err).toBeNull();
  });
  it('Should throw name is required errors', async () => {
    let err: any;
    await Support.create({}).catch((error) => {
      err = error;
    });
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.name).toBeDefined();
  });

  it('Should throw Way is required errors', async () => {
    let err: any;

    await Support.create(withoutWay).catch((error) => {
      err = error;
    });

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.way).toBeDefined();
  });
  it('Should throw invalid value of way errors', async () => {
    let err: any;
    await Support.create(invalidWay).catch((error) => {
      err = error;
    });
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.message).toBeDefined();
  });
});
