import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PageObject} from '@utils/test/pageObject';
import {quotesMock} from '@mocks/qoutes.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {QuotePageComponent} from '@modules/quote-page/quote-page.component';
import {QuotePageModule} from '@modules/quote-page/quote-page.module';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs/index';
import {Location} from '@angular/common';

describe('QuotePageComponent - компонент страницы цитаты', async () => {
  const [firstQuote] = quotesMock;

  let fixture: ComponentFixture<QuotePageComponent>;
  let component: QuotePageComponent;
  let pageObject: PageObject<QuotePageComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('Отображенный текст цитаты соот-ет ожидаемому', async () => {
    expect(pageObject.getElementText('.text')).toBe(
      firstQuote.text,
      'Текст цитаты не соот-ет ожидаемому'
    );
  });

  it('Отображенное имя автора цитаты соот-ет ожидаемому', async () => {
    expect(pageObject.getElementText('.author')).toBe(
      firstQuote.author,
      'Имя автора цитаты не соот-ет ожидаемому'
    );
  });

  it('При клике на "Вернуться к списку" роутит на страницу списка цитат', fakeAsync(() => {
    pageObject.triggerClick('.back');

    tick();

    expect(location.path()).toBe(
      '/',
      'Текущий роут не соот-ет роуту страницы списка цитат'
    );
  }));
});
