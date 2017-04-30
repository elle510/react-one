const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	// entry: './react-one.js',
	entry: {
		'react-ui': './react-ui.js',
		'ui-vendor': [/*'react', 'react-dom',*/ 'datatables.net'/*, 'datatables.net-dt'*/, 
						'ztree', 'select2']
	},
	
	output: {
		path: path.resolve(__dirname, 'dist'),
		// filename: 'react-ui.js',
		filename: '[name].js',
		library: 'UI',
		libraryTarget: 'umd'
	},

	module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }]
			},
			/*
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: 'css-loader?sourceMap',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        }
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            }*/
			{
      			test: /\.css$/,
      			use: ExtractTextPlugin.extract({
        			fallback: 'style-loader',
        			use: 'css-loader'/*,
					publicPath: 'css/'*/
      			})
    		},
			{
      			test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      			loader: 'url-loader',
      			options: {
        			name: 'images/[name].[ext]',
					// prefix: 'images',
        			limit: 10000,
      			}
    		}
        ]
    },
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
      		name: 'ui-vendor'
    	}),
    	new webpack.DefinePlugin({
      		'process.env': {
        		NODE_ENV: JSON.stringify('production')
      		}
    	}),
		new ExtractTextPlugin({
    		filename: 'ui-vendor.css'/*,
    		disable: process.env.NODE_ENV === "development"*/
		})
  	]
}