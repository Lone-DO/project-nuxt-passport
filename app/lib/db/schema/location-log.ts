import { relations } from 'drizzle-orm';
import { int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema } from 'drizzle-zod';
import z from 'zod';

import { DateSchema, DescriptionSchema, LatSchema, LongSchema, NameSchema } from '~/lib/zod-schemas';

import { user } from './auth';
import { location } from './location';

export const locationLog = sqliteTable('locationLog', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  description: text(),
  startedAt: int().notNull(),
  endedAt: int().notNull(),
  lat: real().notNull(),
  long: real().notNull(),
  locationId: int().notNull().references(() => location.id, { onDelete: 'cascade' }),
  userId: int().notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
});

export const locationLogRelations = relations(locationLog, ({ one }) => ({
  location: one(location, {
    fields: [locationLog.locationId],
    references: [location.id],
  }),
}));

export const InsertLocationLog = createInsertSchema(locationLog, {
  name: NameSchema,
  description: DescriptionSchema,
  startedAt: DateSchema,
  endedAt: DateSchema,
  lat: LatSchema,
  long: LongSchema,
}).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  locationId: true,
}).superRefine((values, context) => {
  if (values.startedAt > values.endedAt) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Start Date must be before than End date',
      path: ['startedAt'],
    });
  }
  if (values.endedAt < values.startedAt) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'End Date must be after than Start date',
      path: ['endedAt'],
    });
  }
});

export type InsertLocationLog = z.infer<typeof InsertLocationLog>;

export type locationLog = typeof locationLog.$inferSelect;
