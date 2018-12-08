import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-quotes-page',
  templateUrl: './quotes-page.component.html',
  styleUrls: ['./quotes-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesPageComponent {
  quotesSource$: Observable<IQuote[]> = this.route.data.pipe(mergeMap(({quotes}) => quotes));
  createFormIsClosed = false;

  constructor(private route: ActivatedRoute) {
  }

  close() {
    this.createFormIsClosed = true;
  }

  open() {
    this.createFormIsClosed = false;
  }
}
