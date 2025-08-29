import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import { user } from './auth';
import { locationLog } from './location-log';

export const locationLogImage = sqliteTable('location-log-image', {
  id: int().primaryKey({ autoIncrement: true }),
  key: text().notNull(),

  locationId: int().notNull().references(() => locationLog.id),
  userId: int().notNull().references(() => user.id),

  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});
