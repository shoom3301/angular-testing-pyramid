import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';
import {HttpClient} from '@angular/common/http';

export interface IQuotesService {
  getQuotesList(): Observable<IQuote[]>;
  getQuoteById(id: number): Observable<IQuote>;
  create(text: string, author: string): Observable<IQuote>;
}

@Injectable()
export class QuotesService implements IQuotesService {
  constructor(private httpClient: HttpClient) {
  }

  getQuotesList(): Observable<IQuote[]> {
    return this.httpClient.get<IQuote[]>('/api/quotes');
  }

  getQuoteById(id: number): Observable<IQuote> {
    return this.httpClient.get<IQuote>('/api/quote', {params: {id: id.toString()}});
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
