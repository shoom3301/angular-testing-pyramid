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

describe('QuotesPageComponent - компонент страницы со списком цитат и формой создания цитаты', () => {
  let fixture: ComponentFixture<QuotesPageComponent>;
  let component: QuotesPageComponent;
  let pageObject: PageObject<QuotesPageComponent>;
  let storeMock;

  beforeEach(async () => {
    storeMock = mock<Store<any>>(Store);

    await TestBed.configureTestingModule({
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

  it('Заголовок страницы содержит корректный текст', async () => {
    expect(pageObject.getElementText('.title')).toBe(
      'Цитаты великих людей',
      'Заголовок страницы не соот-ет ожидаемому'
    );
  });

  it('Список цитат отображен и кол-во цитат сопадает с входными данными', async () => {
    expect(pageObject.getElementsBySelector('.quote-item').length).toBe(
      quotesMock.length,
      'Кол-во цитат в списке не соот-ет ожидаемому'
    );
  });

  it('Форма создания цитаты по-умолчанию открыта', async () => {
    expect(pageObject.getElementBySelector('quote-create-form')).toBeTruthy(
      'По-умолчанию, форма создания должна быть открыта'
    );
  });

  it('При клике на кнопку "X" - форма закрывается', async () => {
    pageObject.triggerClick('.close');

    expect(pageObject.getElementBySelector('quote-create-form')).toBeFalsy(
      'Форма не должна отображаться, если кликнули на кнопку "закрыть"'
    );
  });

  it('При клике на конпку "Добавить цитату" - форма открывается', async () => {
    pageObject.triggerClick('.close');
    pageObject.triggerClick('.add-quote-btn');

    expect(pageObject.getElementBySelector('quote-create-form')).toBeTruthy(
      'Форма должна отображаться, если кликнули на кнопку "Добавить цитату"'
    );
  });
});
