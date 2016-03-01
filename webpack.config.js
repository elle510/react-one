module.exports = {
	entry: './react-pum.js',

	output: {
		path: __dirname + '/dist/pum/scripts',
		filename: 'react-pum.js',
		library: 'ReactPum',
		libraryTarget: 'umd'
	},

	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader',
				query: {
                    presets: ['react', 'es2015'],
                    cacheDirectory: true
                }
			}
		]
	}
}