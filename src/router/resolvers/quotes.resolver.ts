import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {Observable, of} from 'rxjs/index';
import {quotesMock} from '@mocks/qoutes.mock';

@Injectable()
export class QuotesResolver implements Resolve<IQuote[]> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IQuote[]> {
    return of(quotesMock);
  }
}
