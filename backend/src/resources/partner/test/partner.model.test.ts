import { Partner } from '../partner.model';
import mongoose from 'mongoose';
import { connect } from '../../../utils/db/setupDB';

const partnerData = {
  name: 'Test',
  slug: 'Test slug',
  banner: 'test banner',
  logo_sm: 'test logo_sm',
  logo_lg: 'test logo_lg',
  website: 'test website',
};

const partnerData2 = {
  slug: 'Test slug',
  banner: 'test banner',
  logo_sm: 'test logo_sm',
  logo_lg: 'test logo_lg',
  website: 'test website',
};

const partnerData3 = {
  name: 'Test',
  banner: 'test banner',
  logo_sm: 'test logo_sm',
  logo_lg: 'test logo_lg',
  website: 'test website',
};

const partnerData4 = {
  name: 'Test',
  banner: 'test banner',
  logo_sm: 'test logo_sm',
  logo_lg: 'test logo_lg',
  website: 'test website',
};

describe('Partner Model Test', () => {
  beforeAll(async () => {
    await connect();
  }, 30000);

  describe('Schema structure testing', () => {
    it('should return the schema of name', async () => {
      const name = Partner.schema.obj.name;
      expect(name).toEqual({
        type: String,
        required: true,
      });
    });
    it('should return the schema of slug', async () => {
      const slug = Partner.schema.obj.slug;
      expect(slug).toEqual({
        type: String,
        required: true,
      });
    });
    it('should return the schema of banner', async () => {
      const banner = Partner.schema.obj.banner;
      expect(banner).toEqual({
        type: String,
      });
    });
    it('should return the schema of logo_sm', async () => {
      const logo_sm = Partner.schema.obj.logo_sm;
      expect(logo_sm).toEqual({
        type: String,
      });
    });
    it('should return the schema of logo_lg', async () => {
      const logo_lg = Partner.schema.obj.logo_lg;
      expect(logo_lg).toEqual({
        type: String,
      });
    });
    it('should return the schema of website', async () => {
      const website = Partner.schema.obj.website;
      expect(website).toEqual({
        type: String,
      });
    });
    it('should return the schema of industry', async () => {
      const industry = Partner.schema.obj.industry;
      expect(industry).toEqual({
        type: String,
        default: 'Computer Software',
      });
    });
    it('should return the schema of companySize', async () => {
      const companySize = Partner.schema.obj.companySize;
      expect(companySize).toEqual({
        type: String,
        default: '10001+',
      });
    });
    it('should return the schema of description', async () => {
      const description = Partner.schema.obj.description;
      expect(description).toEqual({
        type: String,
        minlength: 10,
        default: 'description',
      });
    });
    it('should return the schema of socialMediaLinks', async () => {
      const socialMediaLinks = Partner.schema.obj.socialMediaLinks;
      expect(socialMediaLinks).toEqual({
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
      });
    });
  });
  describe('Valid input testing', () => {
    it('should return a valid Partner model', async () => {
      const eventPrototype = partnerData;
      const event = await Partner.create(eventPrototype);
      expect(event).toBeDefined();
    });
    it('should return an error, given an invalid name field', async () => {
      const eventPrototype = partnerData2;
      let err: any;
      const event = await Partner.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.name).toBeDefined();
    });
    it('should return an error, when slug is not provided', async () => {
      const eventPrototype = partnerData3;
      let err: any;
      const event = await Partner.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.slug).toBeDefined();
    });
    it('should return an error, given an invalid slug field', async () => {
      const eventPrototype = partnerData4;
      let err: any;
      const event = await Partner.create(eventPrototype).catch((error) => {
        err = error;
      });
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.slug).toBeDefined();
    });
  });
});
