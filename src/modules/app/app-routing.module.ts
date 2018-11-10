import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../quotes/quotes.module#QuotesModule'
  },
  {
    path: 'quote',
    loadChildren: '../quote-page/quote-page.module#QuotePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
