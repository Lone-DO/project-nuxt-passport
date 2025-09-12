import type { DrizzleError } from 'drizzle-orm';

import { and, eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

import type { InsertLocation, InsertLocationLog } from './schema';

import db from '../db';
import { location, locationLog } from './schema';

export const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5);

export async function findUniqueSlug(slug: string) {
  let existing = Boolean(await findLocationBySlug(slug));

  /**
   * WHILE slug exist in database, generate new id until new slug is unique
   * TODO: Perform Better Search Queries/Loops
   */
  while (existing) {
    const generatedID = nanoid();
    const idSlug = `${slug}-${generatedID}`;
    existing = Boolean(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }

  return slug;
}

export async function findLocationBySlug(slug: string, userId?: number) {
  if (userId) {
    return db.query.location.findFirst({
      where: and(eq(location.slug, slug), eq(location.userId, userId)),
    });
  }
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findLocationByName(name: string, userId: number) {
  return db.query.location.findFirst({
    where: and(eq(location.name, name), eq(location.userId, userId)),
  });
}
export async function findLocationLogByName(name: string, userId: number, locationId: number) {
  return db.query.locationLog.findFirst({
    where: and(eq(locationLog.name, name), eq(locationLog.userId, userId), eq(locationLog.locationId, locationId)),
  });
}

/** CRUD Methods */

export async function injectLocation(data: InsertLocation, slug: string, userId: number) {
  try {
    const [created] = await db.insert(location).values({
      ...data,
      slug,
      userId,
    }).returning();
    return created;
  }
  catch (_error) {
    const error = _error as DrizzleError;
    if (error.message.includes('UNIQUE constraint failed: location.slug')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Slug must be unique (the location name is used to generate the slug).',
      });
    }
    throw error;
  }
}

export async function injectLocationLog(data: InsertLocationLog, locationId: number, userId: number) {
  const [created] = await db.insert(locationLog).values({
    ...data,
    locationId,
    userId,
  }).returning();
  return created;
}

export async function deleteLocationBySlug(slug: string, userId: number) {
  return db.delete(location).where(and(eq(location.slug, slug), eq(location.userId, userId))).returning();
}

export async function updateLocationBySlug(data: InsertLocation, oldSlug: string, slug: string, userId: number) {
  try {
    const [updated] = await db.update(location).set({ ...data, slug }).where(and(eq(location.slug, oldSlug), eq(location.userId, userId))).returning();
    return updated;
  }
  catch (_error) {
    const error = _error as DrizzleError;
    if (error.message.includes('UNIQUE constraint failed: location.slug')) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Slug must be unique (the location name is used to generate the slug).',
      });
    }
    throw error;
  }
}

export async function findLocation(userId: number, slugId: string) {
  return db.query.location.findFirst({
    where: and(eq(location.userId, userId), eq(location.slug, slugId)),
    with: {
      locationLogs: true,
    },
  });
}
export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}
