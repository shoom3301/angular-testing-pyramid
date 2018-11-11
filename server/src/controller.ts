import {readFileSync} from 'fs';
import {IncomingMessage, ServerResponse} from 'http';
import {resolve} from 'path';
import {IQuote} from './quote.model';

const quotesFilePath = resolve(__dirname, './quotes.json');

class QuotesController {
  getList(req: IncomingMessage, res: ServerResponse) {
    res.end(JSON.stringify(this.loadQuotes())); // TODO send content-type
  }

  getOne(req: IncomingMessage, res: ServerResponse) {

  }

  create(req: IncomingMessage, res: ServerResponse) {

  }

  private loadQuotes(): IQuote[] {
    return JSON.parse(readFileSync(quotesFilePath).toString());
  }
}

export const quotesController = new QuotesController();
