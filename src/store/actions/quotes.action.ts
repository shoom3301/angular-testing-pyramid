import { Action } from '@ngrx/store';
import {IQuote} from '@models/qoute.model';

export enum QuotesActionTypes {
  FETCH = '[Quotes] Fetch',
  FETCHED = '[Quotes] Fetched',
}

export class QuotesFetch implements Action {
  readonly type = QuotesActionTypes.FETCH;
}

export class QuotesFetched implements Action {
  readonly type = QuotesActionTypes.FETCHED;

  constructor(public readonly quotes: IQuote[]) {}
}

export type QuotesActions = QuotesFetch | QuotesFetched;
