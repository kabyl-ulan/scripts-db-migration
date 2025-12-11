/**
 * Database configuration example
 * Copy to databases.js and modify for your environment
 */
export default {
  // Default connection settings (can be overridden per server)
  defaults: {
    port: 5432,
    user: 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  },

  // Server definitions
  servers: [
    {
      id: 'master',
      host: '192.168.1.10',
      tags: ['master', 'production'],
      databases: ['main_db'],
    },
    {
      id: 'slave-1',
      host: '192.168.1.11',
      tags: ['slave', 'production'],
      databases: ['main_db', 'analytics_db'],
    },
    {
      id: 'slave-2',
      host: '192.168.1.12',
      tags: ['slave', 'production'],
      databases: ['main_db'],
    },
    {
      id: 'dev-server',
      host: '192.168.1.100',
      tags: ['development'],
      databases: ['dev_db'],
      // Override defaults for this server
      user: 'dev_user',
      password: process.env.DEV_DB_PASSWORD,
    },
  ],
};
