import {Store, StoreModule} from '@ngrx/store';
import {IQuote} from '@models/qoute.model';
import {TestBed} from '@angular/core/testing';
import {reducersProvider, reducersToken} from '@store/reducers';
import {QuotesFetchAll, QuotesFetchedAll} from '@store/actions/quotes.action';
import {ActivatedRouteSnapshot} from '@angular/router';
import {QuotesResolver} from '@router/resolvers/quotes.resolver';
import {quotesMock} from '@mocks/qoutes.mock';
import {switchMap} from 'rxjs/operators';

describe('QuotesResolver - resolves data for quotes page', () => {
  const expectedQuotes: IQuote[] = quotesMock;
  const route = new ActivatedRouteSnapshot();
  const state = null;

  let quotesResolver: QuotesResolver;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducersToken)
      ],
      providers: [
        QuotesResolver,
        reducersProvider
      ]
    });

    quotesResolver = TestBed.get(QuotesResolver);
    store = TestBed.get(Store);
  });

  it('Creates QuotesFetchAll action, for loading data from server', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = new QuotesFetchAll();

    quotesResolver.resolve(route, state);

    const [action] = storeDispatchSpy.calls.mostRecent().args;

    expect(action).toEqual(
      expectedAction,
      'QuotesFetchAll action is not created'
    );
  });

  it('Gives Observable with quotes list from store', () => {
    let quotes: IQuote[] = null;

    store.dispatch(new QuotesFetchedAll(expectedQuotes));

    quotesResolver.resolve(route, state)
      .pipe(switchMap(q => q))
      .subscribe(q => {
        quotes = q;
      });

    expect(quotes).toEqual(
      expectedQuotes,
      'Given quotes is nit expected'
    );
  });

  it('Observable with a list of quotes can send new data', () => {
    let quotes: IQuote[] = null;

    store.dispatch(new QuotesFetchedAll([expectedQuotes[0]]));

    quotesResolver.resolve(route, state)
      .pipe(switchMap(q => q))
      .subscribe(q => {
        quotes = q;
      });

    expect(quotes).toEqual(
      [expectedQuotes[0]],
      'Given quotes is nit expected (before form send)'
    );

    store.dispatch(new QuotesFetchedAll(expectedQuotes));

    expect(quotes).toEqual(
      expectedQuotes,
      'Given quotes is nit expected (after form send)'
    );
  });
});
