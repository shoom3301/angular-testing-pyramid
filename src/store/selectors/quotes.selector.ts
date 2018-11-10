import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IQuotesState, QUOTES_STATE} from '@store/states/quotes.state';

export const getQuotesState = createFeatureSelector<IQuotesState>(QUOTES_STATE);

export const getQuotes = createSelector(
  getQuotesState,
  (state: IQuotesState) => state.quotes
);
