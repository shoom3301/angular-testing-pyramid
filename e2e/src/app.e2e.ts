import {QuotesListPO} from './quotesList.po';
import {QuotesFormPO} from './quotesForm.po';
import {QuotePagePO} from './quotePage.po';

describe('Quotes app', () => {
  let quotesListPO: QuotesListPO;
  let quotesFormPO: QuotesFormPO;
  let quotePagePO: QuotePagePO;

  beforeEach(async () => {
    quotesListPO = new QuotesListPO();
    quotesFormPO = new QuotesFormPO();
    quotePagePO = new QuotePagePO();

    await quotesListPO.toMainPage();
  });

  it('A list of quotes should be displayed on the page', async () => {
    expect(await quotesListPO.getQuotesCount()).toBeGreaterThan(0);
  });

  it('The created quote should be appended to list', async () => {
    const text = `Dont hurt me (${Date.now()})`;
    const author = 'Hulk';

    await quotesFormPO.setAuthor(author);
    await quotesFormPO.setText(text);
    await quotesFormPO.sendForm();
    await quotesListPO.waitForQuoteByText(text);

    const lastQuote = quotesListPO.quotes.last();

    expect(await quotesListPO.getQuoteText(lastQuote)).toBe(text);
  });

  it('Quote page should be opened on click to quote item', async () => {
    const firstQuote = quotesListPO.quotes.first();
    const text = await quotesListPO.getQuoteText(firstQuote);
    const author = await quotesListPO.getQuoteAuthor(firstQuote);

    await firstQuote.click();
    await quotePagePO.waitForQuotePage();

    expect(await quotePagePO.getQuoteText()).toBe(text);
    expect(await quotePagePO.getQuoteAuthor()).toBe(author);
  });
});
