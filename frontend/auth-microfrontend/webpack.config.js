const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const dependecies = require('./package.json').dependencies;


const PORT = 3003;

const isDev = process.env.NODE_ENV === 'development';

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
    optimization: {
        splitChunks: false,
    },
    resolve: {
        extensions: ['.js'],
    },
    devServer: {
        port: PORT,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes: {
                './Login': './src/components/Login.js',
                './Register': './src/components/Register.js'
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