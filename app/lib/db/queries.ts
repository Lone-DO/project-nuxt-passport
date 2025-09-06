import type { DrizzleError } from 'drizzle-orm';

import { and, eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

import type { InsertLocation } from './schema';

import db from '../db';
import { location } from './schema';

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

export async function findLocationBySlug(slug: string) {
  return db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findLocationByName(name: string, userId: number) {
  return db.query.location.findFirst({
    where: and(eq(location.name, name), eq(location.userId, userId)),
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

export async function findLocation(userId: number, locationId: number) {
  return db.query.location.findFirst({
    where: and(eq(location.userId, userId), eq(location.id, locationId)),
  });
}
export async function findLocations(userId: number) {
  return db.query.location.findMany({
    where: eq(location.userId, userId),
  });
}

/** Types */

export type location = Awaited<ReturnType<typeof findLocation>>;
