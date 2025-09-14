const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200', // Replace with your Elasticsearch instance URL
  auth: {
    username: process.env.ES_USER || 'elastic',
    password: process.env.ELASTIC_PASSWORD || 'YourStrongPassword123'
  },
  tls: { rejectUnauthorized: false }
});

module.exports = client;