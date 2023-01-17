import mongoose from 'mongoose';
import { Team } from '../team.model';
import { connect } from '../../../utils/db/setupDB';
import { PlacementSchema } from '../placement.model';

const teamData = {
  name: 'abebe',
  email: 'abebe@gmail.com',
  image: 'qwresa',
  linkedin: 'wersda',
  description: 'staff',
  country: 'a.a',
  title: 'done',
};

beforeAll(async () => {
  await connect();
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe('team model', () => {
  test('team schema', () => {
    const model = Team.schema.obj;
    expect(model).toEqual({
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      image: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      linkedin: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      placement: {
        type: PlacementSchema,
      },
      priority: {
        type: Number,
        default: 20,
      },
      memberType: {
        type: [
          {
            type: String,
            enum: ['EXECUTIVE', 'BOARD', 'STAFF', 'GROUP', 'PLACEMENT', 'MENTOR'],
          },
        ],
        default: ['GROUP'],
      },
      phase: {
        type: String,
        default: 'Phase-1',
      },
    });
  });
  test('create and save new team', async () => {
    const newValidTeam = new Team(teamData);
    const savedValidTeam = await newValidTeam.save();

    expect(savedValidTeam._id).not.toBeNull();
    expect(savedValidTeam.name).toEqual(teamData.name);
    expect(savedValidTeam.email).toEqual(teamData.email);
    expect(savedValidTeam.image).toEqual(teamData.image);
    expect(savedValidTeam.country).toEqual(teamData.country);
    expect(savedValidTeam.linkedin).toEqual(teamData.linkedin);
    expect(savedValidTeam.description).toEqual(teamData.description);
  });
  test('if required fields are not given it should fail', async () => {
    const newInvalidTeam = new Team({});
    let err;
    try {
      const invalidTeamError = await newInvalidTeam.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
