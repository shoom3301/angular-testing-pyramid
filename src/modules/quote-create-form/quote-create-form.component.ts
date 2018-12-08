import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {QuotesCreate} from '@store/actions/quotes.action';

@Component({
  selector: 'app-quote-create-form',
  templateUrl: './quote-create-form.component.html',
  styleUrls: ['./quote-create-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuotesCreateFormComponent {
  @Output() close = new EventEmitter<boolean>();

  form = new FormGroup({
    text: new FormControl('', [
      Validators.maxLength(256),
      Validators.minLength(2),
      Validators.required
    ]),
    author: new FormControl('', [
      Validators.maxLength(64),
      Validators.minLength(2),
      Validators.required
    ])
  });

  constructor(private store: Store<any>) {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const {text, author} = this.form.value;

    this.store.dispatch(new QuotesCreate(text, author));

    this.form.reset();
  }
}
