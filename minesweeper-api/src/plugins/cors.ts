import cors, { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

// https://github.com/jellydn/nft-app/blob/409f9c265775c3a98cf0e2b560634756a8606f86/server/src/plugins/cors.ts#L10

/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/@fastify/cors
 */
export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  fastify.register(cors, {
    ...opts,
  });
});
