import {NgModule} from '@angular/core';
import {QuotePageComponent} from './quote-page.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: QuotePageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    QuotePageComponent
  ]
})
export class QuotePageModule {
}
