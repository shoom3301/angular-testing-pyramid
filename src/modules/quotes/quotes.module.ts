import {NgModule} from '@angular/core';
import {QuotesComponent} from './quotes.component';
import {QuotesCreateFormModule} from '../quote-create-form/quote-create-form.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuotesComponent
  }
];

@NgModule({
  declarations: [
    QuotesComponent
  ],
  imports: [
    QuotesCreateFormModule,
    RouterModule.forChild(routes)
  ]
})
export class QuotesModule {
}
