import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ICounterState} from '@states/counter.state';
import {Decrement, Increment, Reset} from '@actions/counter.action';
import {getCounterCount} from '@selectors/counter.selector';

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
