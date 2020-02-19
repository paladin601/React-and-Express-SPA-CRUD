const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./src/public', 'build'),
    },
};