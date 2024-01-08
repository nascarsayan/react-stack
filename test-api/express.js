const Express = require('express');

const app = Express();

app.get(
  '/',
  async function rootHandler(req, res) {
    return res.json({ hello: 'world' })
  }
)

app.get(
  '/foo',
  async function rootHandler(req, res) {
    return res.json({ foo: 'bar' })
  }
)

try {
  app.listen(3001,
    () => {
      console.log('server started')
    })
}
catch (err) {
  console.log(err)
  process.exit(1)
}
