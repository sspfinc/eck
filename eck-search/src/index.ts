import { Client } from '@elastic/elasticsearch';
import { readFileSync } from 'fs';

export class ECKSearch {
  private client: Client;

  constructor() {}

  public async connect() {
    this.client = new Client({
      node: 'https://mycluster-es-internal-http:9200',
      auth: {
        apiKey: 'c2lmem1Zb0JNMVE3ZTZ6YkNxemQ6b3c3S0ZfMTFTTGVIeW9HcHN4Sk5TQQ==',
      },
      tls: {
        ca: readFileSync('../secrets/tls.crt'),
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
