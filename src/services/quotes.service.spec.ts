import {QuotesService} from '@services/quotes.service';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {InteractionObject} from '@pact-foundation/pact-web/dsl/interaction';
import {Matchers, PactWeb} from '@pact-foundation/pact-web';
import {quotesMock} from '@mocks/qoutes.mock';

const {pactConfig} = require('../../pact/pact.config');

describe('QuotesService - Http requests to quotes API', () => {
  let provider: PactWeb;
  let quotesService: QuotesService;

  beforeAll(async () => {
    provider = new PactWeb(pactConfig);
  });

  beforeEach(async done => {
    provider
      .removeInteractions()
      .then(done, done.fail);
  });

  afterAll(async done => {
    provider
      .finalize()
      .then(done, done.fail);
  });

  beforeEach(async () => {
    TestBed
      .configureTestingModule({
        imports: [
          HttpClientModule
        ],
        providers: [
          QuotesService
        ]
      });

    quotesService = TestBed.get(QuotesService);
  });

  it('loadQuotesList() - requests a list of quotes', async done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Requests quotes list',
      uponReceiving: 'Quotes list',
      withRequest: {
        method: 'GET',
        path: '/api/quotes',
        query: '',
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      },
      willRespondWith: {
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: Matchers.eachLike(Matchers.like(quote), {min: 1})
      }
    };

    provider
      .addInteraction(interaction)
      .then(() => quotesService.loadQuotesList().toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });

  it('loadQuote() - requests quote by id', async done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Requests quote by id',
      uponReceiving: 'Quote by id',
      withRequest: {
        method: 'GET',
        path: '/api/quote',
        query: {
          id: `${quote.id}`
        },
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      },
      willRespondWith: {
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: Matchers.like(quote)
      }
    };

    provider
      .addInteraction(interaction)
      .then(() => quotesService.loadQuote(quote.id).toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });

  it('createQuote() - quote creating', async done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Quote creating',
      uponReceiving: 'Quote',
      withRequest: {
        method: 'POST',
        path: '/api/quote',
        query: '',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'content-type': 'application/json'
        },
        body: {
          text: quote.text,
          author: quote.author
        }
      },
      willRespondWith: {
        status: 200,
        headers: {
          'content-type': 'application/json'
        },
        body: Matchers.like(quote)
      }
    };

    provider
      .addInteraction(interaction)
      .then(() => quotesService.createQuote(quote.text, quote.author).toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });
});
