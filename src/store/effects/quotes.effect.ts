import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {QuotesActionTypes, QuotesFetched} from '@store/actions/quotes.action';
import {switchMap} from 'rxjs/operators';
import {QuotesService} from '../../services/quotes.service';

@Injectable()
export class QuotesEffect {
  @Effect()
  onFetch$ = this.actions$
    .pipe(
      ofType(QuotesActionTypes.FETCH),
      switchMap(() => this.quotesService.getQuotesList()),
      switchMap(quotes => [
        new QuotesFetched(quotes)
      ])
    );

  constructor(private actions$: Actions,
              private quotesService: QuotesService) {
  }
}
