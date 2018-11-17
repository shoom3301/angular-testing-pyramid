import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
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
    return this.httpClient.post<IQuote>('/api/quote', {text, author});
  }
}
