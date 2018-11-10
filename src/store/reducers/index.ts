import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {quotesReducer} from '@store/reducers/quotes.reducer';
import {QUOTES_STATE} from '@store/states/quotes.state';

export const reducers: ActionReducerMap<any> = {
  [QUOTES_STATE]: quotesReducer,
};

// For AoT compatibility
export const reducersToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export const reducersProvider = [
  {provide: reducersToken, useValue: reducers}
];
