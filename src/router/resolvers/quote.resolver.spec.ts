import {QuoteResolver} from '@router/resolvers/quote.resolver';
import {Store, StoreModule} from '@ngrx/store';
import {IQuote} from '@models/qoute.model';
import {TestBed} from '@angular/core/testing';
import {reducersProvider, reducersToken} from '@store/reducers';
import {QuotesFetchedOne, QuotesFetchOne} from '@store/actions/quotes.action';
import {ActivatedRouteSnapshot} from '@angular/router';
import {quotesMock} from '@mocks/qoutes.mock';

describe('QuoteResolver - resolves data for quote page', () => {
  const expectedQuote: IQuote = quotesMock[2];
  const route = new ActivatedRouteSnapshot();
  const state = null;

  route.params = {id: expectedQuote.id};

  let quoteResolver: QuoteResolver;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducersToken)
      ],
      providers: [
        QuoteResolver,
        reducersProvider
      ]
    });

    quoteResolver = TestBed.get(QuoteResolver);
    store = TestBed.get(Store);
  });

  it('Creates QuotesFetchOne action, for loading data from server', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = new QuotesFetchOne(expectedQuote.id);

    quoteResolver.resolve(route, state);

    const [action] = storeDispatchSpy.calls.mostRecent().args;

    expect(action).toEqual(
      expectedAction,
      'QuotesFetchOne action is not created'
    );
  });

  it('Gives quote from store by id from router', () => {
    let quote: IQuote = null;

    store.dispatch(new QuotesFetchedOne(expectedQuote));

    quoteResolver.resolve(route, state)
      .subscribe(q => {
        quote = q;
      });

    expect(quote).toEqual(
      expectedQuote,
      'Given quote is not expected'
    );
  });

  it('If the store does not have the expected quote, then it expects its appearance (filter)', () => {
    let quote: IQuote = null;

    store.dispatch(new QuotesFetchedOne({
      id: 0,
      text: '',
      author: ''
    }));

    quoteResolver.resolve(route, state)
      .subscribe(q => {
        quote = q;
      });

    expect(quote).toBe(
      null,
      'Quote must be null, when its not exist in store'
    );

    store.dispatch(new QuotesFetchedOne(expectedQuote));

    expect(quote).toEqual(
      expectedQuote,
      'Given quote is not expected'
    );
  });
});
