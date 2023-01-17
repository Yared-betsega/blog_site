import mongoose from 'mongoose';

export const PlacementSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export const ContentSchema = new mongoose.Schema({
  experience: {
    type: String,
    required: true,
  },
  doingNow: {
    type: String,
    required: true,
  },
  lifeChange: {
    type: String,
    required: true,
  },
});

const SuccessStoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  placement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Placement',
  },
  image: {
    type: String,
    required: true,

  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Content',
  },
});

const SuccessStoryResource = mongoose.model('successStory', SuccessStoriesSchema);
export const Placement = mongoose.model('Placement', PlacementSchema);
export const Content = mongoose.model('Content', ContentSchema);
export default SuccessStoryResource;
