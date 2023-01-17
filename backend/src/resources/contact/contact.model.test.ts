import { Contact } from './contact.model';
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
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
  phase: 'Q&A',
};
const withoutPhase = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Selam',
  email: 'Selam@gmail.com',
  subject: 'I want to help',
  message: 'Hi A2SVians, I want to help A2SV',
};
const shortMessage = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Selam',
  email: 'Selam@gmail.com',
  subject: 'I want to help',
  message: 'Hi',
  phase: 'Q&A',
};

describe('Contact Model testing', () => {
  it('should not throw any error if everything is correct', async () => {
    let err: any = null;
    await Contact.create(correct).catch((error) => {
      err = error;
    });
    expect(err).toBeNull();
  });
  it('Should throw name is required errors', async () => {
    let err: any;
    await Contact.create({}).catch((error) => {
      err = error;
    });
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.name).toBeDefined();
  });

  it('Should throw phase is required errors', async () => {
    let err: any;

    await Contact.create(withoutPhase).catch((error) => {
      err = error;
    });

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.phase).toBeDefined();
  });
  it('Should throw message is required minimum length of 10 errors', async () => {
    let err: any;
    await Contact.create(shortMessage).catch((error) => {
      err = error;
    });
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err?.message).toBeDefined();
  });
});
