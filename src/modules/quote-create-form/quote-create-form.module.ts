import {NgModule} from '@angular/core';
import {QuotesCreateFormComponent} from './quote-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ReactiveFormsModule
  ],
  declarations: [
    QuotesCreateFormComponent
  ],
  exports: [
    QuotesCreateFormComponent
  ]
})
export class QuotesCreateFormModule {
}
