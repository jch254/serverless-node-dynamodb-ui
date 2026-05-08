import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path = require('path');
import webpack = require('webpack');

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const srcPath = path.join(__dirname, 'src');
const nodeModulesPath = path.join(__dirname, 'node_modules');

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    `webpack-dev-server/client?http://${SERVER_HOSTNAME}:${SERVER_PORT}`,
    path.join(srcPath, 'index.tsx'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].js',
    chunkFilename: 'assets/[name].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        API_BASE_URI: JSON.stringify(process.env.API_BASE_URI),
        GA_ID: JSON.stringify(process.env.GA_ID),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Serverless API | 603.nz',
      template: path.join(srcPath, 'index.ejs'),
      favicon: path.join(srcPath, 'favicon.ico'),
      meta: {
        description:
          'An API powered by Serverless, TypeScript, Webpack and DynamoDB, intended as a starting point for Serverless APIs',
      },
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        auth0: {
          test: /[\\/]node_modules[\\/].*auth0/,
          name: 'auth0',
          chunks: 'all',
        },
        reactLoading: {
          test: /[\\/]node_modules[\\/]react-loading/,
          name: 'react-loading',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
  resolve: {
    alias: {
      rebass: path.join(srcPath, 'compat', 'rebass.tsx'),
      reflexbox: path.join(srcPath, 'compat', 'reflexbox.tsx'),
      'react-geomicons': path.join(srcPath, 'compat', 'react-geomicons.tsx'),
    },
    fallback: {
      util: require.resolve('util/'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.json'],
    modules: [srcPath, nodeModulesPath],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: srcPath,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        include: srcPath,
        enforce: 'pre',
      },
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        include: srcPath,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10240,
          },
        },
      },
    ],
  },
};

export default config;
