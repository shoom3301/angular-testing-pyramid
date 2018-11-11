import {IncomingMessage, ServerResponse} from 'http';
import {quotesController} from './controller';

export interface IRoute {
  (req: IncomingMessage, res: ServerResponse): void;
}

export const routes: {[route: string]: IRoute} = {
  'GET /quotes/list': quotesController.getList.bind(quotesController),
  'GET /quote': quotesController.getOne.bind(quotesController),
  'POST /quote': quotesController.create.bind(quotesController)
};
