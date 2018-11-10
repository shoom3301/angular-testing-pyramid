import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {QuotesActionTypes, QuotesFetched} from '@store/actions/quotes.action';
import {switchMap} from 'rxjs/operators';
import {quotesMock} from '@mocks/qoutes.mock';

@Injectable()
export class QuotesEffect {
  @Effect()
  onFetch$ = this.actions$
    .pipe(
      ofType(QuotesActionTypes.FETCH),
      switchMap(() => [
        new QuotesFetched(quotesMock)
      ])
    );

  constructor(private actions$: Actions) {
  }
}
