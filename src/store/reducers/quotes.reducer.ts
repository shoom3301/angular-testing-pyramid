import {IQuotesState, quotesInitialState} from '@store/states/quotes.state';
import {QuotesActions, QuotesActionTypes, QuotesFetchedAll, QuotesFetchedOne} from '@store/actions/quotes.action';
import {IQuote} from '@models/qoute.model';

export function quotesReducer(state: IQuotesState = quotesInitialState,
                              action: QuotesActions): IQuotesState {
  switch (action.type) {
    case QuotesActionTypes.FETCHED_ALL: {
      const {quotes} = action as QuotesFetchedAll;

      return {quotes};
    }

    case QuotesActionTypes.FETCHED_ONE: {
      const {quote} = action as QuotesFetchedOne;
      const {quotes} = state;
      const existing = quotes.find(({id}) => id === quote.id);

      if (existing) {
        return state;
      }

      return {
        quotes: sortQuotes([...quotes, quote])
      };
    }

    default:
      return state;
  }
}

export function sortQuotes(quotes: IQuote[]): IQuote[] {
  return quotes.sort((q1, q2) => q1.id - q2.id);
}
