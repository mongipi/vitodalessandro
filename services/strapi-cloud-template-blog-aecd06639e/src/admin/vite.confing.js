const { mergeConfig } = require('vite');

module.exports = (config) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      allowedHosts: [
        'strapi.mongipi.abrdns.com',
        'localhost',
        '127.0.0.1',
      ],
    },
  });
};
