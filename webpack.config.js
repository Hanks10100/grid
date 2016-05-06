var webpack = require('webpack');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js']
    }
};
