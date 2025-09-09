const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://abhi:nBuLSBS1nouXUrtt2bnxAQ@sharp-ermine-15772.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full",
  ssl: {
    rejectUnauthorized: false, // use Cockroach Cloud SSL certs
  },
});

module.exports = pool;
