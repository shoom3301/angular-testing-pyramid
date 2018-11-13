import {QuotesEffect} from '@store/effects/quotes.effect';
import {provideMockActions} from '@ngrx/effects/testing';
import {TestBed} from '@angular/core/testing';
import {ReplaySubject} from 'rxjs';
import {QuotesFetchAll, QuotesFetchedAll} from '@store/actions/quotes.action';
import {QuotesService} from '@services/quotes.service';
import {QuotesMockService} from '@services/quotesMock.service';
import {quotesMock} from '@mocks/qoutes.mock';

describe('QuotesEffect - сайдэффекты на события цитат', () => {
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

  it('При событии QuotesFetchAll запрашивается список цитат и создается событие QuotesFetchedAll', () => {
    const getQuotesListSpy = spyOn(quotesService, 'getQuotesList').and.callThrough();
    let expectedResult: QuotesFetchedAll;

    actions.next(new QuotesFetchAll());

    effects.onFetchAll$.subscribe(result => {
      expectedResult = result;
    });

    expect(getQuotesListSpy).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(new QuotesFetchedAll(quotesMock));
  });
});
