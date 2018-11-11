import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {QuotesCreate} from '@store/actions/quotes.action';

@Component({
  selector: 'quote-create-form',
  templateUrl: './quote-create-form.component.html',
  styleUrls: ['./quote-create-form.component.less']
})
export class QuotesCreateFormComponent {
  form = new FormGroup({
    text: new FormControl('', [
      Validators.max(256),
      Validators.min(2),
      Validators.required
    ]),
    author: new FormControl('', [
      Validators.max(64),
      Validators.min(2),
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
