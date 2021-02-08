import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { EntityManager, IDatabaseDriver, Connection } from '@mikro-orm/core';

export type MyContext = {
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number };
  };
  res: Response;
};
