var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

require('./routes/post')(app);
require('./routes/get')(app);

var PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`=> Server is UP on port ${PORT}`);
})

module.exports = app;