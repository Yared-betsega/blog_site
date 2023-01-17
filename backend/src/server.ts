import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import bodyParser from 'body-parser';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import { connect } from './utils/db/setupDB';
import { impactStoryRouter } from './resources/impactStoryResource/impactStoryResource.router';
import informationRouter from './resources/information/information.router';
import eventRouter from './resources/event/event.router';
import { SuccessRouter } from './resources/successStoryResource/successStory.router';
import placementRouter from './resources/successStoryResource/placement.router';
import contentRouter from './resources/successStoryResource/content.router';
import contactRouter from './resources/contact/contact.router';
import supportRouter from './resources/support/support.router';
import teamRouter from './resources/team/team.router';
import partnerRouter from './resources/partner/partner.router';
import tagRouter from './resources/tag/tag.router';

export const app = express();

app.disable('x-powered-by');

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));
app.use('/api/team', teamRouter);

app.use('/api/information', informationRouter);
app.use('/api/event', eventRouter);
app.use('/api/partner', partnerRouter);

app.use('/api/contact', contactRouter);
app.use('/api/support', supportRouter);
app.use('/api', impactStoryRouter);
app.use('/api/success', SuccessRouter);
app.use('/api/placement', placementRouter);
app.use('/api/content', contentRouter);

app.use('/api/tag', tagRouter)
// eslint-disable-next-line @typescript-eslint/no-explicit-any


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// app.use((req: any, res: any) => {
//   res.json({ data: 'Hello World!' });
// });
// eslint-disable-next-line @typescript-eslint/no-explicit-any

app.use((req: Request, res: Response) => {
  res.json({ data: 'Hello World!' });
});

export const start = async () => {
  await connect();
  try {
    await connect();
    app.listen(config.port, () => {
      console.log(`REST API on http://${config.host}:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};
export default app;
