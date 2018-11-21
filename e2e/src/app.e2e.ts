import {QuotesListPO} from './quotesList.po';
import {QuotesFormPO} from './quotesForm.po';
import {QuotePagePO} from './quotepage.po';

describe('Цитаты великих людей', () => {
  let quotesListPO: QuotesListPO;
  let quotesFormPO: QuotesFormPO;
  let quotePagePO: QuotePagePO;

  beforeEach(async () => {
    quotesListPO = new QuotesListPO();
    quotesFormPO = new QuotesFormPO();
    quotePagePO = new QuotePagePO();

    await quotesListPO.toMainPage();
  });

  it('На главной странице должен отображаться список цитат', async () => {
    expect(await quotesListPO.getQuotesCount()).toBeGreaterThan(0);
  });

  it('Созданная цитата должна добавляться в конец списка', async () => {
    const text = `Dont hurt me (${Date.now()})`;
    const author = 'Hulk';

    await quotesFormPO.setAuthor(author);
    await quotesFormPO.setText(text);
    await quotesFormPO.sendForm();
    await quotesListPO.waitForQuoteByText(text);

    const lastQuote = quotesListPO.quotes.last();

    expect(await quotesListPO.getQuoteText(lastQuote)).toBe(text);
  });

  it('При клике на цитату должна открываться страница этой цитаты', async () => {
    const firstQuote = quotesListPO.quotes.first();
    const text = quotesListPO.getQuoteText(firstQuote);
    const author = quotesListPO.getQuoteAuthor(firstQuote);

    await firstQuote.click();
    await quotePagePO.waitForQuotePage();

    expect(quotePagePO.getQuoteText()).toBe(text);
    expect(quotePagePO.getQuoteAuthor()).toBe(author);
  });
});
