import {browser, ElementArrayFinder, ElementFinder} from 'protractor';

export class QuotesListPO {
  async toMainPage(): Promise<void> {
    return await browser.get('/');
  }

  get quotes(): ElementArrayFinder {
    return browser.$$('.quote-item');
  }

  async getQuotesCount(): Promise<number> {
    return await this.quotes.count();
  }

  getQuoteByNth(nth: number): ElementFinder {
    return this.quotes.get(nth);
  }

  getQuoteByText(text: string): ElementFinder {
    return this.quotes.filter(async element => await element.getText() === text).first();
  }

  async getQuoteText(el: ElementFinder): Promise<string> {
    return await el.$('.quote-text').getText();
  }

  async getQuoteAuthor(el: ElementFinder): Promise<string> {
    return await el.$('.quote-author').getText();
  }

  async waitForQuoteByText(text: string): Promise<void> {
    browser.wait(async () => !!(await this.getQuoteByText(text)), browser.params.timeout);
  }
}
