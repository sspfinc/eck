import { Client } from '@elastic/elasticsearch';
import { readFileSync } from 'fs';

import dotenv from 'dotenv';

export class ECKSearch {
  private client: Client;

  constructor() {
    dotenv.config();
    this.connect();
  }

  public async connect() {
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
    return result;
  }

  public async healthReport() {
    const result = await this.client.healthReport({});
    console.log(result);
    return result;
  }
}
