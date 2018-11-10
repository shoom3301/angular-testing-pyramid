import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {select, Store} from '@ngrx/store';
import {getQuoteById} from '@store/selectors/quotes.selector';
import {IQuote} from '@models/qoute.model';
import {first} from 'rxjs/internal/operators';
import {QuotesFetchOne} from '@store/actions/quotes.action';

@Injectable({
  providedIn: 'root'
})
export class QuoteResolver implements Resolve<IQuote> {
  constructor(private store: Store<any>) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<IQuote> {
    const id = parseInt(route.params.id);

    this.store.dispatch(new QuotesFetchOne(id));

    return this.store.pipe(
      select(getQuoteById(id)),
      first()  // without first() does not work (: Maybe because select() not rxjs function
    );
  }
}
