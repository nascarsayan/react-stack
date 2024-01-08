const Fastify = require('fastify');

const fastify = Fastify({
  logger: true
})

fastify.get(
  '/',
  async function rootHandler(req, res) {
    res.send({ hello: 'world' })
  }
)

fastify.get(
  '/foo',
  async function rootHandler(req, res) {
    res.send({ foo: 'bar' })
  }
)

fastify.listen(
  {
    port: 3001,
    host: "0.0.0.0",
  },
).then(() => {
  console.log('server started')
}).catch((err) => {
  console.log(err)
  process.exit(1)
})
