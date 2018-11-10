import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuotesResolver} from '@router/resolvers/quotes.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: '../quotes/quotes.module#QuotesModule',
    resolve: {
      quotes: QuotesResolver
    }
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
