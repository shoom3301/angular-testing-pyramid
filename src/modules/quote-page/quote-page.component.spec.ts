import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PageObject} from '@utils/test/pageObject';
import {quotesMock} from '@mocks/qoutes.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {QuotePageComponent} from '@modules/quote-page/quote-page.component';
import {QuotePageModule} from '@modules/quote-page/quote-page.module';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {Location} from '@angular/common';

describe('QuotePageComponent - quote page component', () => {
  const [firstQuote] = quotesMock;

  let fixture: ComponentFixture<QuotePageComponent>;
  let component: QuotePageComponent;
  let pageObject: PageObject<QuotePageComponent>;
  let location: Location;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        QuotePageModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {data: of({quote: firstQuote})}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotePageComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject<QuotePageComponent>(fixture);
    location = TestBed.get(Location);

    fixture.detectChanges();
  });

  it('Displayed text of quote is correct', () => {
    expect(pageObject.getElementText('.text')).toBe(
      firstQuote.text,
      'Quotes text is not expected'
    );
  });

  it('Displayed author of quote is correct', () => {
    expect(pageObject.getElementText('.author')).toBe(
      firstQuote.author,
      'Authors text is not expected'
    );
  });

  it('Page should be changed to main on click to "To quotes list"', fakeAsync(() => {
    pageObject.triggerClick('.back');

    tick();

    expect(location.path()).toBe(
      '/',
      'The current path is not math to the main page path'
    );
  }));
});
