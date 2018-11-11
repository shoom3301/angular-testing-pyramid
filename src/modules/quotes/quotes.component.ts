import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesComponent {
  quotesSource$ = this.router.data;

  constructor(private router: ActivatedRoute) {
  }
}
