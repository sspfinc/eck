"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ECKSearch = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const fs_1 = require("fs");
class ECKSearch {
    constructor() { }
    async connect() {
        this.client = new elasticsearch_1.Client({
            node: 'https://mycluster-es-internal-http:9200',
            auth: {
                apiKey: 'c2lmem1Zb0JNMVE3ZTZ6YkNxemQ6b3c3S0ZfMTFTTGVIeW9HcHN4Sk5TQQ==',
            },
            tls: {
                ca: (0, fs_1.readFileSync)('../secrets/tls.crt'),
                rejectUnauthorized: false,
            },
        });
    }
    async search() {
        const result = await this.client.search({
            index: 'my-index',
            query: {
                match: { hello: 'world' },
            },
        });
        console.log(result);
    }
}
exports.ECKSearch = ECKSearch;
async function main() {
    const eck = new ECKSearch();
    eck.connect();
    await eck.search();
}
main();
///curl -u "elastic:HGF9h4N8jpj6S771C0z9w4Us" -k "https://mycluster-es-internal-http:9200"
//# sourceMappingURL=index.js.map