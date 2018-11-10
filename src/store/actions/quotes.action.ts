import { Action } from '@ngrx/store';
import {IQuote} from '@models/qoute.model';

export enum QuotesActionTypes {
  FETCH_ALL = '[Quotes] Fetch all',
  FETCHED_ALL = '[Quotes] Fetched all',
  FETCH_ONE = '[Quotes] Fetch one',
  FETCHED_ONE = '[Quotes] Fetched one',
}

export class QuotesFetchAll implements Action {
  readonly type = QuotesActionTypes.FETCH_ALL;
}

export class QuotesFetchedAll implements Action {
  readonly type = QuotesActionTypes.FETCHED_ALL;

  constructor(public readonly quotes: IQuote[]) {}
}

export class QuotesFetchOne implements Action {
  readonly type = QuotesActionTypes.FETCH_ONE;

  constructor(public readonly id: number) {}
}

export class QuotesFetchedOne implements Action {
  readonly type = QuotesActionTypes.FETCHED_ONE;

  constructor(public readonly quote: IQuote) {}
}

export type QuotesActions = QuotesFetchAll
  | QuotesFetchedAll
  | QuotesFetchOne
  | QuotesFetchedOne;
