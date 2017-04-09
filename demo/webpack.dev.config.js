var webpack = require('webpack');

var buildEntryPoint = function(entryPoint) {
	return [
    	'webpack-dev-server/client?http://localhost:3000',
    	'webpack/hot/only-dev-server',
    	entryPoint
  	]
}

module.exports = {
	entry: {
		app: buildEntryPoint(__dirname + '/src/index.js'),
		'main-layout-2R2C-T-L': buildEntryPoint(__dirname + '/link/main-layout/2R2C-T-L/app.js'),
		'main-layout-2R2C-T-R': buildEntryPoint(__dirname + '/link/main-layout/2R2C-T-R/app.js'),
		'main-layout-2R2C-T-LR': buildEntryPoint(__dirname + '/link/main-layout/2R2C-T-LR/app.js'),
		'main-layout-3R': buildEntryPoint(__dirname + '/link/main-layout/3R/app.js'),
		liveobject: buildEntryPoint(__dirname + '/link/liveobject/app.js'),
		report: buildEntryPoint(__dirname + '/link/report/app.js'),
		workflow: buildEntryPoint(__dirname + '/link/workflow/index.js'),
		'workflow-designer': buildEntryPoint(__dirname + '/link/workflow/designer/index.js'),
		'wpm-was-system-dashboard': buildEntryPoint(__dirname + '/link/dashboard/was-system-old/index.js'),
		'l9-dashboard': buildEntryPoint(__dirname + '/link/dashboard/l9/index.js'),
		'was-system-dashboard': buildEntryPoint(__dirname + '/link/dashboard/was-system/index.js')
	},
	output: {
		path: __dirname + '/build',
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	devServer: {
        hot: true,
        filename: '[name].bundle.js',//'bundle.js',
        publicPath: '/demo/build',
        historyApiFallback: true,
        contentBase: './build',
        proxy: {
            "**": "http://localhost:8888"
        }
    },
	plugins: [
//		new webpack.DefinePlugin({
//	    	'process.env': {
//	    		'NODE_ENV': 'development'
//	    	}
//	    }),
		//new webpack.optimize.OccurenceOrderPlugin(),
		// new webpack.optimize.CommonsChunkPlugin('common.js'),
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
