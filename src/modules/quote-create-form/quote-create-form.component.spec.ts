import {QuotesCreateFormComponent} from '@modules/quote-create-form/quote-create-form.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuotesCreateFormModule} from '@modules/quote-create-form/quote-create-form.module';
import {PageObject} from '@utils/test/pageObject';
import {Store} from '@ngrx/store';
import {anything, capture, instance, mock, verify} from 'ts-mockito';
import {DebugElement} from '@angular/core';
import {QuotesCreate} from '@store/actions/quotes.action';

describe('QuotesCreateFormComponent - компонент формы создания цитаты', () => {
  let fixture: ComponentFixture<QuotesCreateFormComponent>;
  let component: QuotesCreateFormComponent;
  let pageObject: PageObject<QuotesCreateFormComponent>;
  let storeMock;

  beforeEach(async () => {
    storeMock = mock<Store<any>>(Store);

    await TestBed.configureTestingModule({
      imports: [
        QuotesCreateFormModule,
      ],
      providers: [
        {
          provide: Store,
          useValue: instance(storeMock)
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesCreateFormComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject<QuotesCreateFormComponent>(fixture);

    fixture.detectChanges();
  });

  describe('Валидация формы', () => {
    const getErrorElement = () => pageObject.getElementBySelector('.error');
    let authorInput: DebugElement;
    let textInput: DebugElement;
    let submitButton: DebugElement;

    beforeEach(async () => {
      authorInput = pageObject.getElementBySelector('.author-input');
      textInput = pageObject.getElementBySelector('.text-input');
      submitButton = pageObject.getElementBySelector('.submit');
    });

    it('По-умолчанию текст ошибки валидации не отображается', async () => {
      const errorElement = pageObject.getElementBySelector('.error');

      expect(errorElement).toBeFalsy('Текст ошибки по-умолчанию должен быть скрыт');
    });

    describe('Ошибка валидации отображается если:', () => {
      it('Длинна имени автора менее 2 символов', async () => {
        pageObject.setInputValue(authorInput, 'A');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Длинна текста менее 2 символов', async () => {
        pageObject.setInputValue(textInput, 'B');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Длинна имени автора более 64 символов', async () => {
        pageObject.setInputValue(authorInput, 'c'.repeat(65));

        expect(getErrorElement()).toBeTruthy();
      });

      it('Длинна текста более 256 символов', async () => {
        pageObject.setInputValue(textInput, 'd'.repeat(257));

        expect(getErrorElement()).toBeTruthy();
      });

      it('Автор незаполнен', async () => {
        pageObject.setInputValue(authorInput, 'e');
        pageObject.setInputValue(authorInput, '');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Текст незаполнен', async () => {
        pageObject.setInputValue(textInput, 'f');
        pageObject.setInputValue(textInput, '');

        expect(getErrorElement()).toBeTruthy();
      });
    });

    describe('Ошибка валидации скрывается если', () => {
      beforeEach(async () => {
        pageObject.setInputValue(authorInput, 'a');
        pageObject.setInputValue(authorInput, '');
      });

      it('Длинна имени автора > 2 & < 64 и длинна текст > 2 & < 256', async () => {
        expect(getErrorElement()).toBeTruthy();

        pageObject.setInputValue(authorInput, 'test');
        pageObject.setInputValue(textInput, 'me please');

        expect(getErrorElement()).toBeFalsy();
      });
    });

    describe('Отправка формы', () => {
      const text = 'Съешь еще этих мягких булок';
      const author = 'Бабушка';

      function fillAndSubmitForm(authorValue = author, textValue = text) {
        pageObject.setInputValue(authorInput, authorValue);
        pageObject.setInputValue(textInput, textValue);
        pageObject.triggerClick(submitButton);
      }

      describe('Если форма валидна', () => {
        it('Отправляются введенные данные', async () => {
          fillAndSubmitForm();

          const [action] = capture(storeMock.dispatch).last();

          expect(action).toEqual(new QuotesCreate(text, author));
        });

        it('Поля формы очищаются', async () => {
          fillAndSubmitForm();

          expect(pageObject.getInputText(authorInput)).toBe('');
          expect(pageObject.getInputText(textInput)).toBe('');
        });
      });

      describe('Если форма невалидна', () => {
        it('Введенные данные не отправляются', async () => {
          fillAndSubmitForm('1', '2');

          verify(storeMock.dispatch(anything())).never();
        });
      });
    });
  });
});
