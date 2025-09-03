import type { User } from 'better-auth';

declare module 'h3' {
  /** Override H3EventContext.user type to int */
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, 'id'> & {
      id: number;
    };
  }
}
