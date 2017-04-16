const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: {
		//'react-puf': './react-puf.js'
        app: './demo/src/index.js'
	},
    // entry: [
    //     'react-hot-loader/patch',
    //     'webpack-dev-server/client?http://localhost:4000',
    //     'webpack/hot/only-dev-server',
    //     './react-puf.js'
    // ],
	output: {
        filename: '[name].js',
		path: path.resolve(__dirname, 'demo', 'build'),
        publicPath: '/'
		// library: 'Puf',
		// libraryTarget: 'umd'
	},
	devServer: {
        hot: true,
        inline: true,
        // host: '0.0.0.0',
        port: 4000,
        filename: '[name].js',
        publicPath: '/',
        // historyApiFallback: true,
        contentBase: './demo/build',
        // proxy: {
        //     "**": "http://localhost:8888"
        // }
    },
    module:{
        rules: [
            { 
                test: /\.js$/, 
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: ['transform-object-rest-spread']
                    }
                }]
            }
        ]
        /*
        loaders:[
            {
                test: /\.js$/, 
				exclude: /node_modules/, 
				loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
					plugins: ['transform-object-rest-spread'],
                })]
            }
        ]
        */
    },
    plugins: [
		new webpack.DefinePlugin({
	    	PRODUCTION: JSON.stringify(false),
  			VERSION: JSON.stringify("BETA 0.5")
	    }),
        new webpack.HotModuleReplacementPlugin()
	]
};
