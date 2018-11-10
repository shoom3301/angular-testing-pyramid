import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IQuotesState, QUOTES_STATE} from '@store/states/quotes.state';
import {IQuote} from '@models/qoute.model';

export const getQuotesState = createFeatureSelector<IQuotesState>(QUOTES_STATE);

export const getQuotes = createSelector(
  getQuotesState,
  (state: IQuotesState) => state.quotes
);

export const getQuoteById = (id: number) => {
  return createSelector(
    getQuotes,
    (quotes: IQuote[]) => quotes.find(quote => quote.id === id)
  );
};
