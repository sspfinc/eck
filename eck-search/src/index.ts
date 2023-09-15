import Fastify from 'fastify';
import fastifyFavicon from 'fastify-favicon';
import { ECKSearch } from './eck-search';

const eck = new ECKSearch();

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyFavicon, {
  name: 'favicon.png',
  maxAge: 3600,
});

// Declare a route
fastify.get('/', async function (request, reply) {
  const response = await eck.info();
  return reply.send(response);
});

fastify.get('/health', async function (request, reply) {
  const response = await eck.healthReport();
  return reply.send(response);
});

// Run the server!
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.debug(address);
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
