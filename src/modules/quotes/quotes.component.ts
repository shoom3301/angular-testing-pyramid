import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IQuote} from '@models/qoute.model';

@Component({
  selector: 'quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.less']
})
export class QuotesComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    const quotes = this.router.snapshot.data as IQuote[];

    console.log(quotes);
  }

}
