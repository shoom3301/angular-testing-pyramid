import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {Observable, of} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {QuotesFetchAll} from '@store/actions/quotes.action';
import {getQuotes} from '@store/selectors/quotes.selector';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesResolver implements Resolve<Observable<IQuote[]>> {
  constructor(private store: Store<any>) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Observable<IQuote[]>> {
    this.store.dispatch(new QuotesFetchAll());

    return of(
      this.store.pipe(
        select(getQuotes),
        filter(quotes => !!quotes)
      )
    );
  }
}
