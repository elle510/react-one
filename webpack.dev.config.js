var webpack = require('webpack');

module.exports = {
	entry: {
		'react-puf': __dirname + '/react-puf.js'
	},
	output: {
		path: __dirname + '/build/scripts',
		filename: '[name].js',
		library: 'Puf',
		libraryTarget: 'umd'
	},
	devServer: {
        hot: true,
        filename: '[name].js',
        publicPath: '/build/scripts',
        historyApiFallback: true,
        contentBase: './build/scripts',
        proxy: {
            "**": "http://localhost:8888"
        }
    },
	plugins: [
		new webpack.DefinePlugin({
	    	PRODUCTION: JSON.stringify(false),
  			VERSION: JSON.stringify("BETA 0.5"),
			COMPONENT_TYPE: JSON.stringify("")  // webix/kendo/both
	    }),
		//new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()/*,
        new webpack.NoEmitOnErrorsPlugin()*/
	],
    module:{
        loaders:[
            {
                test: /\.js$/, 
				exclude: /node_modules/, 
				loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
					plugins: ['transform-object-rest-spread'],
                })]/*,
				loader: 'babel-loader',
				query: {
                    presets: ['react', 'es2015'],
                    plugins: ["transform-object-rest-spread"],
                    cacheDirectory: true
                }*/
            }
        ]
    }
};
