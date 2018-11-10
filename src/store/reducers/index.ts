import {COUNTER_STATE} from '@store/states/counter.state';
import {counterReducer} from './counter.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

export const reducers: ActionReducerMap<any> = {
  [COUNTER_STATE]: counterReducer
};

// For AoT compatibility
export const reducersToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export const reducersProvider = [
  {provide: reducersToken, useValue: reducers}
];
