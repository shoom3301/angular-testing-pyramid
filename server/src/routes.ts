import {IncomingMessage, ServerResponse} from 'http';
import {quotesController} from './quotesController';

type RouteResolver = (req: IncomingMessage, res: ServerResponse) => void;

export const routes: { [route: string]: RouteResolver } = {
  'GET /quotes': quotesController.getList.bind(quotesController),
  'GET /quote': quotesController.getOne.bind(quotesController),
  'POST /quote': quotesController.create.bind(quotesController)
};
