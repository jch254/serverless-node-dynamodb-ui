import webpack = require('webpack');
import WebpackDevServer = require('webpack-dev-server');

import devConfig from './webpack.config';
import prodConfig from './webpack.prod.config';

const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT as string, 10) : 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';

const webpackConfig = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const output = webpackConfig.output as webpack.Configuration['output'];

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer({
  historyApiFallback: true,
  hot: process.env.NODE_ENV !== 'production',
  devMiddleware: {
    publicPath: output?.publicPath as string,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  },
}, compiler);

server.startCallback(() => {
  console.log(`Server listening at http://${SERVER_HOSTNAME}:${SERVER_PORT}`);
});
