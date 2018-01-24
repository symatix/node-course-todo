// check environment, supply keys

const env = process.env.NODE_ENV || 'development';


if (env === 'production') {
	module.exports = require('./prod')
} else if (env === 'development') {
	module.exports = require('./dev')
} else if (env === 'test'){
	module.exports = require('./test')
}