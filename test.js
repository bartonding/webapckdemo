const path = require('path')
const webpack = require('webpack')
const WebpackCompilerHooks = require('./plugin/compiler.hooks')
let webpackconfig = require('./webpack.config')

// webpackconfig = {
//     // mode: 'development',
//     context: __dirname,
//     // output: {
//     //     path: path.resolve(__dirname, 'dist'),
//     // },
//     plugins: [
//         new WebpackCompilerHooks()
//     ]
// }
// console.log(webpackconfig)
const compiler = webpack(webpackconfig)

const watching = compiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
        console.log('~~~~~~ error', err)
        return;
    }
    console.log(stats.toString({
        chunks: false,  // Makes the build much quieter
        colors: true    // Shows colors in the console
    }));
    console.log('~~~~~~~~~~success!')
})