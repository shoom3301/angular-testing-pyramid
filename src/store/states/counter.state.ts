export interface ICounterState {
  count: number;
}

export const COUNTER_STATE = 'counterState';

export const counterInitialState: ICounterState = {
  count: 0
};
