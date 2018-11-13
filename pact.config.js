const path = require('path');
const process = require('process');

const KARMA_CONFIG_PACT = {
  consumer: 'angular-testing-pyramid',
  provider: 'api',
  port: 1234,
};

function configurePactProvider(config) {
  const commonConfiguration = {
    cors: true,
    dir: 'pact/pacts',
    spec: 2,
    logLevel: 'DEBUG',
    log: path.resolve(process.cwd(), 'pact', `${config.provider}.log`),
    pactfileWriteMode: true
  };

  return {
    ...commonConfiguration,
    ...config
  };
}

function pactConfig(config) {
  config.set({
    frameworks: config.frameworks.concat('pact'),
    plugins: config.plugins.concat('@pact-foundation/karma-pact'),
    pact: [
      configurePactProvider(KARMA_CONFIG_PACT),
    ],
    proxies: {
      '/api': `http://localhost:${KARMA_CONFIG_PACT.port}/api/`
    }

  });
}

module.exports = {
  pactConfig,
  KARMA_CONFIG_PACT: KARMA_CONFIG_PACT
};
