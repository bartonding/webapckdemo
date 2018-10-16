const webpack = require('webpack')
const webpackconfig = require('./webpack.config')

const compiler = webpack(webpackconfig)

compiler.run((err, stats) => {
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