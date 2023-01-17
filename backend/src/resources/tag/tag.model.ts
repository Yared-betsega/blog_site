import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const tagSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Tag = mongoose.model('Tag', tagSchema);
export default Tag;
