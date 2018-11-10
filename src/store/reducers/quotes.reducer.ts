import {IQuotesState, quotesInitialState} from '@store/states/quotes.state';
import {QuotesActions, QuotesActionTypes, QuotesFetched} from '@store/actions/quotes.action';

export function quotesReducer(state: IQuotesState = quotesInitialState,
                              action: QuotesActions): IQuotesState {
  switch (action.type) {
    case QuotesActionTypes.FETCHED:
      return {
        quotes: (action as QuotesFetched).quotes
      };

    default:
      return state;
  }
}
