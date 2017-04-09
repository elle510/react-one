var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');

const devPort = 3000;

var webpackConfig = './demo/webpack.dev.config';

//if(process.env.NODE_ENV == 'development') {
    console.log('Server(demo) is running on development mode');

    const config = require(webpackConfig);
    var compiler = webpack(config);
    var devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(devPort, () => {
        console.log('webpack-dev-server(demo) is listening on port', devPort);
    });
//}