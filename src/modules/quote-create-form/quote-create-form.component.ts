import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';

@Component({
  selector: 'quote-create-form',
  templateUrl: './quote-create-form.component.html',
  styleUrls: ['./quote-create-form.component.less']
})
export class QuotesCreateFormComponent {
  form = new FormGroup({
    text: new FormControl(''), // TODO add validator
    author: new FormControl('')
  });

  constructor(private store: Store<any>) {
  }

  onSubmit() {
    const {text, author} = this.form.value;

    // this.store.dispatch();
    console.log(text, author);
  }
}
