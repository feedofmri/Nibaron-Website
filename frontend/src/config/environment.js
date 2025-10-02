// Environment configuration for different deployment stages
export const environment = {
  development: {
    apiUrl: 'http://localhost:8000/api',
    wsUrl: 'ws://localhost:8000/ws',
    debug: true,
    enableMockData: true,
    enableDevTools: true,
  },
  staging: {
    apiUrl: 'https://staging-api.nibaron-bazaar.com/api',
    wsUrl: 'wss://staging-api.nibaron-bazaar.com/ws',
    debug: false,
    enableMockData: false,
    enableDevTools: false,
  },
  production: {
    apiUrl: 'https://api.nibaron-bazaar.com/api',
    wsUrl: 'wss://api.nibaron-bazaar.com/ws',
    debug: false,
    enableMockData: false,
    enableDevTools: false,
  }
};

const currentEnv = import.meta.env.MODE || 'development';
export const config = environment[currentEnv];

export default config;
