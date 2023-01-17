import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const informationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      minlength: 10,
      required: true,
    },
    description: {
      type: Schema.Types.Mixed,
    },
    phase: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Information = mongoose.model('Information', informationSchema);
export default Information;
