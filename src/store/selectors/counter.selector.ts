import {createFeatureSelector, createSelector} from '@ngrx/store';
import {COUNTER_STATE, ICounterState} from '@states/counter.state';

export const getCounterState = createFeatureSelector<ICounterState>(COUNTER_STATE);

export const getCounterCount = createSelector(
  getCounterState,
  (state: ICounterState) => state.count
);
