import {QuotesFetchedAll, QuotesFetchedOne} from '@store/actions/quotes.action';
import {quotesReducer} from '@store/reducers/quotes.reducer';
import {IQuotesState} from '@store/states/quotes.state';
import {quotesMock} from '@mocks/qoutes.mock';
import {IQuote} from '@models/qoute.model';

describe('quotesReducer - редьюсер цитат', () => {
  it('При событии QuotesFetchedAll заменяет весь список цитат', () => {
    const state: IQuotesState = {quotes: []};
    const newState = quotesReducer(state, new QuotesFetchedAll(quotesMock));

    expect(newState).toEqual({quotes: quotesMock});
  });

  it('При событии QuotesFetchedOne добавляет цитату в список', () => {
    const quote: IQuote = {
      id: 6,
      text: 'Test me pls',
      author: 'you'
    };
    const state: IQuotesState = {quotes: []};
    const newState = quotesReducer(state, new QuotesFetchedOne(quote));

    expect(newState).toEqual({quotes: [quote]});
  });

  it('При событии QuotesFetchedOne, если цитата с таким же id уже есть, то state не меняется', () => {
    const quote: IQuote = {
      id: 6,
      text: 'Test me pls',
      author: 'you'
    };
    const state: IQuotesState = {quotes: [quote]};
    const newState = quotesReducer(state, new QuotesFetchedOne(quote));

    expect(newState).toBe(state);
  });

  it('При событии QuotesFetchedOne добавляет цитату в список и сортирует этот список', () => {
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
