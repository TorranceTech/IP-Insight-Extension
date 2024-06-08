const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',  // Seu arquivo de entrada principal
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new Dotenv()
    ],
    mode: 'development'  // Use 'production' para builds de produção
};
