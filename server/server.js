const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
require('newrelic');

const PORT = 3000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/api/listings/:id', express.static('public'));

app.use('/api', proxy({target: 'http://localhost:3030', changeOrigin: true}))

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});