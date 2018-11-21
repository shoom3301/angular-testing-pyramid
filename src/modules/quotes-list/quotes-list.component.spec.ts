import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PageObject} from '@utils/test/pageObject';
import {QuotesListComponent} from '@modules/quotes-list/quotes-list.component';
import {QuotesListModule} from '@modules/quotes-list/quotes-list.module';
import {quotesMock} from '@mocks/qoutes.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {BlankComponent, BlankModule} from '@utils/test/blank.component';

describe('QuotesListComponent - компонент списка цитат', () => {
  const [firstQuote] = quotesMock;

  let fixture: ComponentFixture<QuotesListComponent>;
  let component: QuotesListComponent;
  let pageObject: PageObject<QuotesListComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlankModule,
        QuotesListModule,
        RouterTestingModule.withRoutes([{
          path: 'quote/:id',
          component: BlankComponent
        }])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesListComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject<QuotesListComponent>(fixture);
    location = TestBed.get(Location);

    component.quotes = quotesMock;

    fixture.detectChanges();
  });

  it('Количество отображенных цитат совпадает с входными данными', async () => {
    const quotesList = pageObject.getElementsBySelector('.quote-item');

    expect(quotesList.length).toBe(
      quotesMock.length,
      'Кол-во отображенных цитат не совпадает'
    );
  });

  it('Текст первой цитаты соответствует', async () => {
    const quoteText = pageObject.getElementBySelector('.quote-text');

    expect(pageObject.getElementText(quoteText)).toBe(
      firstQuote.text,
      'Текст первой цитаты не соот-ет'
    );
  });

  it('Имя автора первой цитаты соответствует', async () => {
    const quoteAuthor = pageObject.getElementBySelector('.quote-author');

    expect(pageObject.getElementText(quoteAuthor)).toBe(
      firstQuote.author,
      'Имя автора первой цитаты не соот-ет'
    );
  });

  it('При клике на первую цитату роутит на страницу цитаты', fakeAsync(() => {
    pageObject.triggerClick('a');

    tick();

    expect(location.path()).toBe(
      `/quote/${firstQuote.id}`,
      'Текущий роут не соот-ет роуту страницы цитаты'
    );
  }));
});
