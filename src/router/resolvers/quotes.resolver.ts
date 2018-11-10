import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {Observable} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import {QuotesFetchAll} from '@store/actions/quotes.action';
import {getQuotes} from '@store/selectors/quotes.selector';
import {first} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesResolver implements Resolve<IQuote[]> {
  constructor(private store: Store<any>) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IQuote[]> {
    this.store.dispatch(new QuotesFetchAll());

    return this.store.pipe(
      select(getQuotes),
      first() // without first() does not work (: Maybe because select() not rxjs function
    );
  }
}
