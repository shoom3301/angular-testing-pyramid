import {readFileSync, writeFileSync} from 'fs';
import {IncomingMessage, ServerResponse} from 'http';
import {resolve} from 'path';
import {parse} from 'querystring';

interface IQuoteCreateRequest {
  text: string;
  author: string;
}

interface IQuote {
  id: number;
  text: string;
  author: string;
}

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

  async create(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = await this.getRequestJson<IQuoteCreateRequest>(req);

      if (!this.createRequestIsValid(body)) {
        res.statusCode = 400;
        res.end();

        return;
      }

      const quotes = this.loadQuotes();
      const id = this.getMaxId(quotes) + 1;
      const quote = {
        id,
        text: body.text,
        author: body.author
      };

      quotes.push(quote);
      this.saveQuotes(quotes);
      this.sendJson(res, quote);

    } catch (error) {
      console.error('On quote create error: ', error);

      res.statusCode = 500;
      res.end();
    }
  }

  private getMaxId(quotes: IQuote[]): number {
    let minId = 0;

    quotes.forEach(({id}) => {
      if (id > minId) {
        minId = id;
      }
    });

    return minId;
  }

  private createRequestIsValid(requestBody: IQuoteCreateRequest): boolean {
    return !!requestBody
      && typeof requestBody.author === 'string'
      && typeof requestBody.text === 'string'
      && requestBody.author.length >= 2 && requestBody.author.length <= 64
      && requestBody.text.length >= 2 && requestBody.text.length <= 256;
  }

  private async getRequestJson<T>(req: IncomingMessage): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let buffer = '';

      req.on('data', (chunk: string) => {
        buffer += chunk;
      });

      req.on('end', () => {
        try {
          const json = JSON.parse(buffer);

          resolve(json);
        } catch (e) {
          reject(new Error('Request json parse error'));
        }
      });

      req.on('error', error => {
        reject(error);
      })
    });
  }

  private loadQuotes(): IQuote[] {
    return JSON.parse(readFileSync(quotesFilePath).toString());
  }

  private saveQuotes(quotes: IQuote[]) {
    writeFileSync(quotesFilePath, JSON.stringify(quotes, undefined, 4));
  }

  private sendJson(res: ServerResponse, json: any) {
    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(json));
  }
}

export const quotesController = new QuotesController();
