import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  constructor(private httpClient: HttpClient) {}

  getQuotesList(): Observable<IQuote[]> {
    return this.httpClient.get<IQuote[]>('/api/quotes');
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
