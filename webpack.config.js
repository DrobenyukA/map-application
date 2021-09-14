const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        port: 8888,
        hot: false,
        client: {
            overlay: {
                errors: true,
                warnings: false
            },
        },
    },
    module: {
    rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'MapApplication',
            filename: 'remoteEntry.js',
            exposes: {
                './MapIndex': './src/index.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
    ],
}