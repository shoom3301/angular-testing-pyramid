import {CounterActions, CounterActionTypes, Reset} from '@store/actions/counter.action';
import {counterInitialState, ICounterState} from '@store/states/counter.state';

export function counterReducer(state: ICounterState = counterInitialState,
                               action: CounterActions): ICounterState {
  switch (action.type) {
    case CounterActionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case CounterActionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case CounterActionTypes.RESET:
      return {
        count: (action as Reset).payload
      };
    default:
      return state;
  }
}
