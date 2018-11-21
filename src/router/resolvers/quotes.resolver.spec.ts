import {Store, StoreModule} from '@ngrx/store';
import {IQuote} from '@models/qoute.model';
import {TestBed} from '@angular/core/testing';
import {reducersProvider, reducersToken} from '@store/reducers';
import {QuotesFetchAll, QuotesFetchedAll} from '@store/actions/quotes.action';
import {ActivatedRouteSnapshot} from '@angular/router';
import {QuotesResolver} from '@router/resolvers/quotes.resolver';
import {quotesMock} from '@mocks/qoutes.mock';
import {switchMap} from 'rxjs/operators';

describe('QuotesResolver - определяет данные для страницы со списком цитат', () => {
  const expectedQuotes: IQuote[] = quotesMock;
  const route = new ActivatedRouteSnapshot();
  const state = null;

  let quotesResolver: QuotesResolver;
  let store: Store<any>;

  beforeEach(async () => {
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

  it('Создает событие QuotesFetchAll, для загрузки данных с сервера', async () => {
    const storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = new QuotesFetchAll();

    quotesResolver.resolve(route, state);

    const [action] = storeDispatchSpy.calls.mostRecent().args;

    expect(action).toEqual(
      expectedAction,
      'Событие QuotesFetchAll не было создано'
    );
  });

  it('Получает Observable со списоком цитат из store', async () => {
    let quotes: IQuote[] = null;

    store.dispatch(new QuotesFetchedAll(expectedQuotes));

    quotesResolver.resolve(route, state)
      .pipe(switchMap(q => q))
      .subscribe(q => {
        quotes = q;
      });

    expect(quotes).toEqual(
      expectedQuotes,
      'Полученные цитата не соот-ют ожидаемым'
    );
  });

  it('Observable со списоком цитат может присылать новые данные', async () => {
    let quotes: IQuote[] = null;

    store.dispatch(new QuotesFetchedAll([expectedQuotes[0]]));

    quotesResolver.resolve(route, state)
      .pipe(switchMap(q => q))
      .subscribe(q => {
        quotes = q;
      });

    expect(quotes).toEqual(
      [expectedQuotes[0]],
      'Полученные цитаты не соот-ют ожидаемым (до отправки новых данных)'
    );

    store.dispatch(new QuotesFetchedAll(expectedQuotes));

    expect(quotes).toEqual(
      expectedQuotes,
      'Полученные цитаты не соот-ют ожидаемым (после отправки новых данных)'
    );
  });
});
