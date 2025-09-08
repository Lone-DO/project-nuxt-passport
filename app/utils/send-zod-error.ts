import type { H3Event } from 'h3';
import type { ZodError } from 'zod';

export default function sendZodError(event: H3Event, error: ZodError) {
  /** Pretty Errors messages as Key/value pairs */
  let statusMessage: string[] | string = [];
  const data: Record<string, string> = {};
  for (const issue of error.issues) {
    /** expected example("name: required") */
    statusMessage.push(`${issue.path.join('')}: ${issue.message}`);
    data[issue.path.join('')] = issue.message;
  }
  statusMessage = statusMessage.join('; ');

  return sendError(event, createError({
    statusCode: 422,
    statusMessage,
    data,
  }));
}
