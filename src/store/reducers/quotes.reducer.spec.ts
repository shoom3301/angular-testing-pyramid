import {QuotesFetchedAll, QuotesFetchedOne} from '@store/actions/quotes.action';
import {quotesReducer} from '@store/reducers/quotes.reducer';
import {IQuotesState} from '@store/states/quotes.state';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';

describe('Reducer for quotes', () => {
  it('QuotesFetchedAll must replace quotes list in store', () => {
    const state: IQuotesState = {quotes: []};
    const newState = quotesReducer(state, new QuotesFetchedAll(quotesMock));

    expect(newState).toEqual({quotes: quotesMock});
  });

  it('QuotesFetchedOne must append quote to the list in store', () => {
    const quote: IQuote = {
      id: 6,
      text: 'Test me pls',
      author: 'you'
    };
    const state: IQuotesState = {quotes: []};
    const newState = quotesReducer(state, new QuotesFetchedOne(quote));

    expect(newState).toEqual({quotes: [quote]});
  });

  it('QuotesFetchedOne must do not append quote to the list in store, if quote is exist in list', () => {
    const quote: IQuote = {
      id: 6,
      text: 'Test me pls',
      author: 'you'
    };
    const state: IQuotesState = {quotes: [quote]};
    const newState = quotesReducer(state, new QuotesFetchedOne(quote));

    expect(newState).toBe(state);
  });

  it('QuotesFetchedOne must append quote to the list in store, if quote is not exist in list', () => {
    const quote1: IQuote = {
      id: 1,
      text: 'Test me pls 1',
      author: 'you'
    };
    const quote2: IQuote = {
      id: 2,
      text: 'Test me pls 2',
      author: 'you'
    };
    const quote3: IQuote = {
      id: 3,
      text: 'Test me pls 3',
      author: 'you'
    };
    const state: IQuotesState = {quotes: [quote3, quote2]};
    const newState = quotesReducer(state, new QuotesFetchedOne(quote1));

    expect(newState).toEqual({quotes: [quote1, quote2, quote3]});
  });
});
