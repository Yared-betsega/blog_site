import mongoose, { Schema } from 'mongoose';

export interface IPartnerInterface {
  name: string;
  slug: string;
  banner: string;
  logo_sm: string;
  logo_lg: string;
  website: string;
  industry: string;
  companySize: string;
  description: string;
  tags: string;
  socialMediaLinks: {
    name: string;
    url: string;
  };
}

export const PartnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
    },
    logo_sm: {
      type: String,
    },
    logo_lg: {
      type: String,
    },
    website: {
      type: String,
    },
    industry: {
      type: String,
      default: 'Computer Software',
    },
    companySize: {
      type: String,
      default: '10001+',
    },
    description: {
      type: String,
      minlength: 10,
      default: 'description',
    },
    tags: [String],
    socialMediaLinks: {
      type: [
        {
          name: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export const Partner = mongoose.model<IPartnerInterface>('Partner', PartnerSchema);
