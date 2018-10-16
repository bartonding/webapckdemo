const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackCompilerHooks = require('./plugin/compiler.hooks')
const WebpackCompilationHooks = require('./plugin/compilation.hooks')

module.exports = {
    context: __dirname,
    mode: 'development',
    // entry: './src/index.js',
    entry: {
        app: './src/index.js',
    },    
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // devtool: '#eval-source-map',
    devServer: {
        contentBase: './',
        overlay: true,
        compress: true,
        disableHostCheck: true,
        port: 80,
        allowedHosts: ['.qq.com']
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebpackPlugin({
        //     title: 'Development'
        // }),
        new WebpackCompilerHooks(),
        // new WebpackCompilationHooks()
    ]
};