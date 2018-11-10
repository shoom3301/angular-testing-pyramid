import {NgModule} from '@angular/core';
import {QuotePageComponent} from './quote-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: QuotePageComponent
  }
];


@NgModule({
  declarations: [
    QuotePageComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class QuotePageModule {
}
