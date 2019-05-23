import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PageObject} from '@utils/test/pageObject';
import {QuotesPageComponent} from '@modules/quotes-page/quotes-page.component';
import {QuotesPageModule} from '@modules/quotes-page/quotes-page.module';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {instance, mock} from 'ts-mockito';
import {Store} from '@ngrx/store';
import {quotesMock} from '@mocks/qoutes.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {BlankModule} from '@utils/test/blank.component';

describe('QuotesPageComponent - quotes page component', () => {
  let fixture: ComponentFixture<QuotesPageComponent>;
  let component: QuotesPageComponent;
  let pageObject: PageObject<QuotesPageComponent>;
  let storeMock;

  beforeEach(() => {
    storeMock = mock<Store<any>>(Store);

    TestBed.configureTestingModule({
      imports: [
        QuotesPageModule,
        BlankModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {data: of({quotes: [quotesMock]})}
        },
        {
          provide: Store,
          useValue: instance(storeMock)
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesPageComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject<QuotesPageComponent>(fixture);

    fixture.detectChanges();
  });

  it('Title of page contains correct tex', () => {
    expect(pageObject.getElementText('.title')).toBe(
      'Quotes app',
      'Title of page is not expected'
    );
  });

  it('Quotes list is displayed and count of displayed quotes matches the input data', () => {
    expect(pageObject.getElementsBySelector('.quote-item').length).toBe(
      quotesMock.length,
      'Count of quotes in list is not expected'
    );
  });

  it('Quote create form is opened by default', () => {
    expect(pageObject.getElementBySelector('app-quote-create-form')).toBeTruthy(
      'Form must be opened by default'
    );
  });

  it('Form is closing when "X" button is clicked', () => {
    pageObject.triggerClick('.close');

    expect(pageObject.getElementBySelector('app-quote-create-form')).toBeFalsy(
      'Form must not be displayed, when "close" button is clicked'
    );
  });

  it('Form is opening when "Create quote" button is clicked', () => {
    pageObject.triggerClick('.close');
    pageObject.triggerClick('.add-quote-btn');

    expect(pageObject.getElementBySelector('app-quote-create-form')).toBeTruthy(
      'Form must be displayed, when "add quote" button is clicked'
    );
  });
});
