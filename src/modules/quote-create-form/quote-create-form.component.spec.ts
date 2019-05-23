import {QuotesCreateFormComponent} from '@modules/quote-create-form/quote-create-form.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuotesCreateFormModule} from '@modules/quote-create-form/quote-create-form.module';
import {PageObject} from '@utils/test/pageObject';
import {Store} from '@ngrx/store';
import {anything, capture, instance, mock, verify} from 'ts-mockito';
import {DebugElement} from '@angular/core';
import {QuotesCreate} from '@store/actions/quotes.action';

describe('QuotesCreateFormComponent - quote create form component', () => {
  let fixture: ComponentFixture<QuotesCreateFormComponent>;
  let component: QuotesCreateFormComponent;
  let pageObject: PageObject<QuotesCreateFormComponent>;
  let storeMock;

  beforeEach(() => {
    storeMock = mock<Store<any>>(Store);

    TestBed.configureTestingModule({
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

  describe('Form validation', () => {
    const getErrorElement = () => pageObject.getElementBySelector('.error');
    let authorInput: DebugElement;
    let textInput: DebugElement;
    let submitButton: DebugElement;

    beforeEach(() => {
      authorInput = pageObject.getElementBySelector('.author-input');
      textInput = pageObject.getElementBySelector('.text-input');
      submitButton = pageObject.getElementBySelector('.submit');
    });

    it('Text of error validation is not displayed by default', () => {
      const errorElement = pageObject.getElementBySelector('.error');

      expect(errorElement).toBeFalsy('Error text must be not displayed');
    });

    describe('Validation error is displayed, when:', () => {
      it('Author name length less than 2 characters', () => {
        pageObject.setInputValue(authorInput, 'A');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Text less than 2 characters', () => {
        pageObject.setInputValue(textInput, 'B');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Author name length greater than 64 characters', () => {
        pageObject.setInputValue(authorInput, 'c'.repeat(65));

        expect(getErrorElement()).toBeTruthy();
      });

      it('Text length greater than 256 characters', () => {
        pageObject.setInputValue(textInput, 'd'.repeat(257));

        expect(getErrorElement()).toBeTruthy();
      });

      it('Author is not filled', () => {
        pageObject.setInputValue(authorInput, 'e');
        pageObject.setInputValue(authorInput, '');

        expect(getErrorElement()).toBeTruthy();
      });

      it('Text is not filled', () => {
        pageObject.setInputValue(textInput, 'f');
        pageObject.setInputValue(textInput, '');

        expect(getErrorElement()).toBeTruthy();
      });
    });

    describe('alidation error is not displayed, when:', () => {
      beforeEach(() => {
        pageObject.setInputValue(authorInput, 'a');
        pageObject.setInputValue(authorInput, '');
      });

      it('Length of author name > 2 & < 64 and length of text > 2 & < 256', () => {
        expect(getErrorElement()).toBeTruthy();

        pageObject.setInputValue(authorInput, 'test');
        pageObject.setInputValue(textInput, 'me please');

        expect(getErrorElement()).toBeFalsy();
      });
    });

    describe('Form submitting', () => {
      const text = 'In God';
      const author = 'We trust';

      function fillAndSubmitForm(authorValue = author, textValue = text) {
        pageObject.setInputValue(authorInput, authorValue);
        pageObject.setInputValue(textInput, textValue);
        pageObject.triggerClick(submitButton);
      }

      describe('When form is valid', () => {
        it('The entered data is sent', () => {
          fillAndSubmitForm();

          const [action] = capture(storeMock.dispatch).last();

          expect(action).toEqual(new QuotesCreate(text, author));
        });

        it('Fields of form cleans', () => {
          fillAndSubmitForm();

          expect(pageObject.getInputText(authorInput)).toBe('');
          expect(pageObject.getInputText(textInput)).toBe('');
        });
      });

      describe('When form is not valid', () => {
        it('The entered data is not sent', () => {
          fillAndSubmitForm('1', '2');

          verify(storeMock.dispatch(anything())).never();
        });
      });
    });
  });
});
