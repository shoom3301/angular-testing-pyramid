import {browser, ElementFinder, ExpectedConditions} from 'protractor';

export class QuotePagePO {
  get quotePage(): ElementFinder {
    return browser.$('app-quote-page');
  }

  get quoteText(): ElementFinder {
    return this.quotePage.$('.text');
  }

  get quoteAuthor(): ElementFinder {
    return this.quotePage.$('.author');
  }

  async getQuoteText(): Promise<string> {
    return await this.quoteText.getText();
  }

  async getQuoteAuthor(): Promise<string> {
    return await this.quoteAuthor.getText();
  }

  async waitForQuotePage(): Promise<void> {
    browser.wait(
      ExpectedConditions.presenceOf(this.quotePage),
      browser.params.timeout,
      'Не дождались загрузки страницы цитаты'
    );
  }
}
