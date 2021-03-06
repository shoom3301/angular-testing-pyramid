import {NgModule} from '@angular/core';
import {QuotesPageComponent} from './quotes-page.component';
import {QuotesCreateFormModule} from '../quote-create-form/quote-create-form.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {QuotesListModule} from '@modules/quotes-list/quotes-list.module';

const routes: Routes = [
  {
    path: '',
    component: QuotesPageComponent
  }
];

@NgModule({
  declarations: [
    QuotesPageComponent
  ],
  imports: [
    CommonModule,
    QuotesCreateFormModule,
    QuotesListModule,
    RouterModule.forChild(routes)
  ]
})
export class QuotesPageModule {
}
