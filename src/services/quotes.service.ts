import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IQuote} from '@models/qoute.model';
import {HttpClient} from '@angular/common/http';

export interface IQuotesService {
  loadQuotesList(): Observable<IQuote[]>;

  loadQuote(id: number): Observable<IQuote>;

  createQuote(text: string, author: string): Observable<IQuote>;
}

@Injectable()
export class QuotesService implements IQuotesService {
  constructor(private httpClient: HttpClient) {
  }

  loadQuotesList(): Observable<IQuote[]> {
    return this.httpClient.get<IQuote[]>('/api/quotes');
  }

  loadQuote(id: number): Observable<IQuote> {
    return this.httpClient.get<IQuote>('/api/quote', {params: {id: id.toString()}});
  }

  createQuote(text: string, author: string): Observable<IQuote> {
    return this.httpClient.post<IQuote>('/api/quote', {text, author});
  }
}
