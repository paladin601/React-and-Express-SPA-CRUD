const path = require('path');

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./src/public', 'build'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};