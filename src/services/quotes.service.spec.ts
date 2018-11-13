import {QuotesService} from '@services/quotes.service';
import {PACT_CONFIG} from '../pact.heplers';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {InteractionObject} from '@pact-foundation/pact-web/dsl/interaction';
import {Matchers, PactWeb} from '@pact-foundation/pact-web';
import {quotesMock} from '@mocks/qoutes.mock';

describe('QuotesService - сервис работы с api цитат', () => {
  let provider: PactWeb;
  let quotesService: QuotesService;

  beforeAll(async () => {
    provider = new PactWeb(PACT_CONFIG);
  });

  beforeEach(done => {
    provider
      .removeInteractions()
      .then(done, done.fail);
  });

  afterAll(done => {
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

  it('getQuotesList() - запрашивает список цитат из api', done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Получение списка цитат',
      uponReceiving: 'Список цитат',
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
      .then(() => quotesService.getQuotesList().toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });

  it('getQuoteById() - запрашивает цитату по id', done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Получение цитаты по id',
      uponReceiving: 'Цитата по id',
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
      .then(() => quotesService.getQuoteById(quote.id).toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });

  it('create() - создание цитаты', done => {
    const quote = quotesMock[0];
    const interaction: InteractionObject = {
      state: 'Создание цитаты',
      uponReceiving: 'Цитата',
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
      .then(() => quotesService.create(quote.text, quote.author).toPromise())
      .then(() => provider.verify())
      .then(done, done.fail);
  });
});
