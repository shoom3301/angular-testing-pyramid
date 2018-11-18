import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotePageComponent {
  quoteSource$: Observable<IQuote> = this.route.data.pipe(map(({quote}) => quote));

  constructor(private route: ActivatedRoute) {
  }
}
