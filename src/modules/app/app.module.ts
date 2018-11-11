import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RoutingModule} from '@router/routing.module';
import {AppComponent} from './app.component';
import {reducersProvider, reducersToken} from '@store/reducers/index';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {effects} from '@store/effects';
import {HttpClientModule} from '@angular/common/http';

const storeDevTools = [];

if (!environment.production) {
  storeDevTools.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducersToken),
    EffectsModule.forRoot(effects),
    ...storeDevTools
  ],
  providers: [
    reducersProvider
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
