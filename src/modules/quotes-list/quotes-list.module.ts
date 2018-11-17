import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuotesListComponent} from './quotes-list.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    QuotesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    QuotesListComponent
  ]
})
export class QuotesListModule {
}
