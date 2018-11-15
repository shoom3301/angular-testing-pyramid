import {NgModule} from '@angular/core';
import {QuotesCreateFormComponent} from './quote-create-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
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
