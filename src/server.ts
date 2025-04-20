import 'dotenv/config';
import mongoose from 'mongoose';

import app from './app';

const dbString = (process.env.DATABASE_URL ?? '').replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD ?? '',
);

mongoose
  .connect(dbString || '')
  .then(() => console.log('Database connected successfully'));

app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Application is up and running - port : ${process.env.PORT || 3000}`,
  ),
);
