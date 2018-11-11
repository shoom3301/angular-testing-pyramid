import {IQuote} from '@models/qoute.model';

export interface IQuotesState {
  quotes: IQuote[];
}

export const QUOTES_STATE = 'quotesState';

export const quotesInitialState: IQuotesState = {
  quotes: []
};
