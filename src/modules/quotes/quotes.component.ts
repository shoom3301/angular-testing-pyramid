import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.less']
})
export class QuotesComponent {
  quotes = this.router.snapshot.data.quotes as IQuote[];

  constructor(private router: ActivatedRoute) {
  }
}
