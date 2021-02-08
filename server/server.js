const port = process.env.PORT || 9000

const app = require('../server');

app.listen(port, () => {
  console.log(`Server started on port ${ port }`)
}).on('error', err => {
  console.log('ERROR: ', err)
});