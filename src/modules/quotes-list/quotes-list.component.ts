import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IQuote} from '@models/qoute.model';

@Component({
  selector: 'quotes-list',
  templateUrl: './quotes-list.component.html',
  styleUrls: ['./quotes-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesListComponent {
  @Input() quotes: IQuote[];
}
