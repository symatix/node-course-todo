var express = require('express');
var bodyParser = require('body-parser');

var keys = require('./conf/keys');

var app = express();

app.use(bodyParser.json());

require('./routes/todos')(app);
require('./routes/users')(app);

app.listen(keys.port, () => {
    console.log(`| Server is UP on port ${keys.port} |`);
})

module.exports = app;