import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs/index';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {
  getQuotesList(): Observable<IQuote[]> {
    return of(quotesMock);
  }

  getQuoteById(id: number): Observable<IQuote> {
    return of(quotesMock.find(quote => quote.id === id));
  }
}
