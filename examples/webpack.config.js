var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

// var ExtractTextPlugin = require("extract-text-webpack-plugin");

// const extractLess = new ExtractTextPlugin({
//     filename: "style.css",
//     disable: process.env.NODE_ENV === "development"
// });

module.exports = {
    entry: __dirname + '/index.js',
    
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: "source-map",   // sourcemap 설정
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }]
            }/*,
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader?sourceMap",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }*/
        ]
    },
    plugins: [
        // extractLess,
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         unused: true
        //     },
        //     mangle: false,
        //     beautify: true,
        //     output: {
        //         comments: true
        //     }
        // })
    ]
}