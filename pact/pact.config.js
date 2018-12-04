/**
 * https://github.com/pact-foundation/pact-js/tree/master/examples/e2e
 */

const pactConfig = {
  consumer: 'Front service',
  provider: 'angular-testing-pyramid',
  port: 1234
};

const pactBrokerConfig = {
  pactBrokerUrl: 'https://test.pact.dius.com.au',
  pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
  pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1'
};

const providerProxyPort = 8999;

module.exports = {pactConfig, pactBrokerConfig, providerProxyPort};
