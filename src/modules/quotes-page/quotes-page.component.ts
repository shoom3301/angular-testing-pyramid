import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent {
  quotesSource$: Observable<IQuote[]> = this.router.data.pipe(mergeMap(({quotes}) => quotes));
  createFormIsClosed = false;

  constructor(private router: ActivatedRoute) {
  }

  close() {
    this.createFormIsClosed = true;
  }

  open() {
    this.createFormIsClosed = false;
  }
}
