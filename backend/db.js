const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://root@127.0.0.1:26257/newdb?sslmode=disable',
});

module.exports = pool;