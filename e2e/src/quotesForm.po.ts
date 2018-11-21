import {browser, ElementFinder} from 'protractor';

export class QuotesFormPO {
  get authorInput(): ElementFinder {
    return browser.$('.author-input');
  }

  get textInput(): ElementFinder {
    return browser.$('.text-input');
  }

  get submitButton(): ElementFinder {
    return browser.$('.submit');
  }

  async setAuthor(author: string): Promise<void> {
    await this.authorInput.sendKeys(author);
  }

  async setText(text: string): Promise<void> {
    await this.textInput.sendKeys(text);
  }

  async sendForm(): Promise<void> {
    await this.submitButton.click();
  }
}
