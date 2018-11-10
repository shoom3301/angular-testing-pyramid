import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.less']
})
export class QuotePageComponent implements OnInit {

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.router.snapshot.data);
  }

}
