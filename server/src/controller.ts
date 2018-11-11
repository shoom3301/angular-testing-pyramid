import {readFileSync} from 'fs';
import {IncomingMessage, ServerResponse} from 'http';
import {resolve} from 'path';
import {parse} from 'querystring';
import {IQuote} from './quote.model';

const quotesFilePath = resolve(__dirname, './quotes.json');

class QuotesController {
  getList(req: IncomingMessage, res: ServerResponse) {
    const quotes = this.loadQuotes();

    this.sendJson(res, quotes);
  }

  getOne(req: IncomingMessage, res: ServerResponse) {
    const [,query] = (req.url || '').split('?');
    const params = parse(query);
    const id = parseInt(params.id as string);
    const requestIsValid = !isNaN(id) && id >=0 && id <= 9999999;

    if (!requestIsValid) {
      res.statusCode = 400;
      res.end();

      return;
    }

    const quotes = this.loadQuotes();
    const quote = quotes.find(q => q.id === id) || null;

    this.sendJson(res, quote);
  }

  create(req: IncomingMessage, res: ServerResponse) {

  }

  private loadQuotes(): IQuote[] {
    return JSON.parse(readFileSync(quotesFilePath).toString());
  }

  private sendJson(res: ServerResponse, json: any) {
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(json));
  }
}

export const quotesController = new QuotesController();
