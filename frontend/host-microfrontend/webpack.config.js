const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const dependecies = require('./package.json').dependencies;


const PORT = 3000;
const PLACES_REMOTE_ENTRY_URL = process.env.PLACES_REMOTE_ENTRY_URL || 'http://localhost:3001';
const PROFILE_REMOTE_ENTRY_URL = process.env.PROFILE_REMOTE_ENTRY_URL || 'http://localhost:3002';
const AUTH_REMOTE_ENTRY_URL = process.env.AUTH_REMOTE_ENTRY_URL || 'http://localhost:3003';

const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const getSharedDeps = (deps) => {
    return deps.reduce((acc, dep) => {
        acc[dep] = {
            singleton: true,
            eager: true,
            requiredVersion: dependecies[dep]
        }

        return acc;
    }, {});
}

module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        port: PORT,
        historyApiFallback: true
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            favicon: path.resolve(__dirname, 'public', 'favicon.ico')
        }),
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: 'host',
            remotes: {
                places: `places@${PLACES_REMOTE_ENTRY_URL}/remoteEntry.js`,
                profile: `profile@${PROFILE_REMOTE_ENTRY_URL}/remoteEntry.js`,
                auth: `auth@${AUTH_REMOTE_ENTRY_URL}/remoteEntry.js`
            },
            shared: getSharedDeps(['react', 'react-dom'])
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                    },
                }],
                type: 'javascript/auto'
            },
        ]
    }
}