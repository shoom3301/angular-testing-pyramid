import {QuoteResolver} from '@router/resolvers/quote.resolver';
import {Store, StoreModule} from '@ngrx/store';
import {IQuote} from '@models/qoute.model';
import {TestBed} from '@angular/core/testing';
import {reducersProvider, reducersToken} from '@store/reducers';
import {QuotesFetchedOne, QuotesFetchOne} from '@store/actions/quotes.action';
import {ActivatedRouteSnapshot} from '@angular/router';

describe('QuoteResolver - определяет данные для страницы цитаты', () => {
  const expectedQuote: IQuote = {
    id: 5,
    text: 'text',
    author: 'author'
  };
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

  it('Создает событие QuotesFetchOne, для загрузки данных с сервера', () => {
    const storeDispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    const expectedAction = new QuotesFetchOne(expectedQuote.id);

    quoteResolver.resolve(route, state);

    const [action] = storeDispatchSpy.calls.mostRecent().args;

    expect(action).toEqual(
      expectedAction,
      'Событие QuotesFetchOne не было создано'
    );
  });

  it('Получает цитату из store по заданному в роутере id', () => {
    let quote: IQuote = null;

    store.dispatch(new QuotesFetchedOne(expectedQuote));

    quoteResolver.resolve(route, state)
      .subscribe(q => {
        quote = q;
      });

    expect(quote).toEqual(
      expectedQuote,
      'Полученная цитата не соот-ет ожидаемой'
    );
  });

  it('Если в store нет нужной цитаты, то ожидает ее появления (filter)', () => {
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
      'Цитата должна быть null, если ее нет в store'
    );

    store.dispatch(new QuotesFetchedOne(expectedQuote));

    expect(quote).toEqual(
      expectedQuote,
      'Полученная цитата не соот-ет ожидаемой'
    );
  });
});
