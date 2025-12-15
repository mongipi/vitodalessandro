/**
 * Database Configuration for Strapi
 * 
 * Supporta:
 * - SQLite (default development)
 * - PostgreSQL (production with Docker Swarm)
 * 
 * Legge da variabili d'ambiente per flessibilità
 */

const path = require('path');
const fs = require('fs');

/**
 * Legge da file se esiste (per Docker Secrets)
 */
function readSecret(envVar, defaultValue) {
  const value = process.env[envVar];
  
  if (!value) {
    return defaultValue;
  }
  
  // Se è un file (es. /run/secrets/...), leggi il contenuto
  if (value.startsWith('/')) {
    try {
      return fs.readFileSync(value, 'utf8').trim();
    } catch (err) {
      console.warn(`Warning: Could not read secret from ${value}`);
      return defaultValue;
    }
  }
  
  return value;
}

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');
  
  // Database password - supporta sia env var che file (Docker Secrets)
  const password = readSecret('DATABASE_PASSWORD', env('DATABASE_PASSWORD', 'strapi'));

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: password,
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10) 
      },
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: password,
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { 
        min: env.int('DATABASE_POOL_MIN', 2), 
        max: env.int('DATABASE_POOL_MAX', 10) 
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
