const path = require('path');
const { dependencies } = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = (env, { mode }) => {
    const isProduction = mode === 'production';
    return {
        entry: path.join(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            assetModuleFilename: 'images/[hash][ext][query]',
        },
        devServer: {
            port: 8888,
            hot: false,
            https: true,
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
                            presets: [
                                '@babel/preset-env',
                                ['@babel/preset-react', { runtime: 'automatic'}]
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    type: isProduction ? 'asset/asset' : 'assets/resource'
                }
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: 'MapApplication',
                filename: 'remoteEntry.js',
                exposes: {
                    './app': './src/components/Map/index.js',
                },
                shared: {
                    ...dependencies,
                    react: {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react']
                    },
                    'react-dom': {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react-dom']
                    },
                    'react-redux': {
                        singleton: true,
                        eager: true,
                        requiredVersion: dependencies['react-redux'],
                    }
                }
            }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html'),
            }),
        ],
    }
};
