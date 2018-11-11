import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  QuotesActionTypes, QuotesCreate, QuotesFetchedAll, QuotesFetchedOne,
  QuotesFetchOne
} from '@store/actions/quotes.action';
import {switchMap} from 'rxjs/operators';
import {QuotesService} from '@services/quotes.service';

@Injectable()
export class QuotesEffect {
  @Effect()
  onFetchAll$ = this.actions$
    .pipe(
      ofType(QuotesActionTypes.FETCH_ALL),
      switchMap(() => this.quotesService.getQuotesList()),
      switchMap(quotes => [
        new QuotesFetchedAll(quotes)
      ])
    );

  @Effect()
  onFetchOne$ = this.actions$
    .pipe(
      ofType(QuotesActionTypes.FETCH_ONE),
      switchMap(({id}: QuotesFetchOne) => this.quotesService.getQuoteById(id)),
      switchMap(quote => [
        new QuotesFetchedOne(quote)
      ])
    );

  @Effect()
  onCreate$ = this.actions$
    .pipe(
      ofType(QuotesActionTypes.CREATE),
      switchMap(({text, author}: QuotesCreate) => this.quotesService.create(text, author)),
      switchMap(quote => [
        new QuotesFetchedOne(quote)
      ])
    );

  constructor(private actions$: Actions,
              private quotesService: QuotesService) {
  }
}
