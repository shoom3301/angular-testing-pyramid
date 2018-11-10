import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';

@Component({
  selector: 'quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.less']
})
export class QuotePageComponent {
  quote = this.router.snapshot.data.quote as IQuote;

  constructor(private router: ActivatedRoute) {
  }
}
