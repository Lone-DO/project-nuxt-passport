import { z } from 'zod';

export const SearchSchema = z.object({
  q: z.string().min(1, 'You must enter a search term.'),
});

export type SearchSchema = z.infer<typeof SearchSchema>;

/**
 * TODO: Update to ZOD 4
 * https://zod.dev/v4/changelog (Migration guide)
 */
export const NameSchema = z.string().min(1).max(100);
export const DescriptionSchema = z.string().max(1000).or(z.null());
export const LatSchema = z.coerce.number().min(-90).max(90);
export const LongSchema = z.coerce.number().min(-180).max(180);
export const DateSchema = z.number({
  message: 'Date is required',
});
