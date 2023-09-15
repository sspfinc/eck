import { Client } from '@elastic/elasticsearch';
import { readFileSync } from 'fs';

import dotenv from 'dotenv';

export class ECKSearch {
  private client: Client;

  constructor() {
    dotenv.config();
  }

  public async connect() {
    console.log(process.env.ECK_NODE);
    console.log(process.env.ECK_API_KEY);
    console.log(process.env.ECK_CA);
    this.client = new Client({
      node: process.env.ECK_NODE,
      auth: {
        apiKey: process.env.ECK_APIKEY,
      },
      tls: {
        ca: readFileSync(process.env.ECK_CA.toString()),
        rejectUnauthorized: false,
      },
    });
  }

  public async search() {
    const result = await this.client.search({
      index: 'my-index',
      query: {
        match: { hello: 'world' },
      },
    });

    console.log(result);
  }

  public async info() {
    const result = await this.client.info();
    console.log(result);
  }

  public async healthReport() {
    const result = await this.client.healthReport({});
    console.log(result);
  }
}

async function main() {
  const eck = new ECKSearch();
  eck.connect();
  await eck.info();
  await eck.healthReport();
}

main();
///curl -u "elastic:HGF9h4N8jpj6S771C0z9w4Us" -k "https://mycluster-es-internal-http:9200"
