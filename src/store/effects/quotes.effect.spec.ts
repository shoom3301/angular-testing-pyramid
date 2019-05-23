import {QuotesEffect} from '@store/effects/quotes.effect';
import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {
  QuotesCreate,
  QuotesFetchAll,
  QuotesFetchedAll,
  QuotesFetchedOne,
  QuotesFetchOne
} from '@store/actions/quotes.action';
import {QuotesService} from '@services/quotes.service';
import {getLastQuote, QuotesMockService} from '@services/quotesMock.service';
import {quotesMock} from '@mocks/qoutes.mock';

describe('Side-effects for quotes', () => {
  const actions = new ReplaySubject(1);
  let effects: QuotesEffect;
  let quotesService: QuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuotesEffect,
        provideMockActions(() => actions),
        {provide: QuotesService, useClass: QuotesMockService}
      ]
    });

    effects = TestBed.get(QuotesEffect);
    quotesService = TestBed.get(QuotesService);
  });

  it('When QuotesFetchAll is triggered, a list of quotes is requested and the QuotesFetchedAll event is created', () => {
    const getQuotesListSpy = spyOn(quotesService, 'loadQuotesList').and.callThrough();
    let expectedResult: QuotesFetchedAll;

    actions.next(new QuotesFetchAll());

    effects.onFetchAll$.subscribe(result => {
      expectedResult = result;
    });

    expect(getQuotesListSpy).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(new QuotesFetchedAll(quotesMock));
  });

  it('When QuotesFetchOne is triggered, a quote is requested and the QuotesFetchedOne event is created', () => {
    const id = 1;
    const getQuoteByIdSpy = spyOn(quotesService, 'loadQuote').and.callThrough();
    let expectedResult: QuotesFetchedOne;

    actions.next(new QuotesFetchOne(id));

    effects.onFetchOne$.subscribe(result => {
      expectedResult = result;
    });

    expect(getQuoteByIdSpy).toHaveBeenCalledTimes(1);
    expect(getQuoteByIdSpy).toHaveBeenCalledWith(id);
    expect(expectedResult).toEqual(new QuotesFetchedOne(quotesMock.find(quote => quote.id === id)));
  });

  it('When QuotesCreate is triggered, the quote is sent to the server and the QuotesFetchedOne event is created', () => {
    const text = 'Test me please';
    const author = 'Me';
    const createSpy = spyOn(quotesService, 'createQuote').and.callThrough();
    let expectedResult: QuotesFetchedOne;

    actions.next(new QuotesCreate(text, author));

    effects.onCreate$.subscribe(result => {
      expectedResult = result;
    });

    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith(text, author);
    expect(expectedResult).toEqual(new QuotesFetchedOne({
      id: getLastQuote().id,
      text,
      author
    }));
  });
});
