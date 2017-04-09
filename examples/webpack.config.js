const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

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
    /*
	entry: {
		//app: ['./app/main.js', '.lib/index.js'],
		app: './01-hello-world/app.js'
	},
	*/
	/*
	entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
		if (fs.statSync(path.join(__dirname, dir)).isDirectory()) {
			if(dir != 'js')
				entries[dir] = path.join(__dirname, dir, 'app.js');
		}

		return entries
	}, {}),

	output: {
		path: __dirname + "/js",
		//path: path.join(__dirname, "js"),
		filename: "[name].bundle.js",
		chunkFilename: "[id].chunk.js",
		publicPath: '/js/'
	},
	 */
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