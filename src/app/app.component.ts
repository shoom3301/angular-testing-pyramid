import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ICounterState} from '../store/states/counter.state';
import {Decrement, Increment, Reset} from '../store/actions/counter.action';
import {getCounterCount} from '../store/selectors/counter.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  count$ = this.store.pipe(select(getCounterCount));

  constructor(private store: Store<ICounterState>) {}

  increment() {
    this.store.dispatch(new Increment());
  }

  decrement() {
    this.store.dispatch(new Decrement());
  }

  reset() {
    this.store.dispatch(new Reset(0));
  }
}
