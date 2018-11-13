import {Observable, of} from 'rxjs/index';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';
import {IQuotesService} from '@services/quotes.service';

export class QuotesMockService implements IQuotesService {
  getQuotesList(): Observable<IQuote[]> {
    return of(quotesMock);
  }

  getQuoteById(id: number): Observable<IQuote> {
    return of(quotesMock.find(quote => quote.id === id));
  }

  create(text: string, author: string): Observable<IQuote> {
    const quote: IQuote = {
      id: this.generateId(),
      text,
      author
    };

    quotesMock.push(quote);

    return of(quote);
  }

  private generateId(): number {
    let minId = 0;

    quotesMock.forEach(({id}) => {
      if (id > minId) {
        minId = id;
      }
    });

    return minId + 1;
  }
}

export function getLastQuote(): IQuote {
  let lastQuote = quotesMock[0];

  for (let quote of quotesMock) {
    if (quote.id > lastQuote.id) {
      lastQuote = quote;
    }
  }

  return lastQuote;
}
