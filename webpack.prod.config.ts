import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path = require('path');
import TerserPlugin from 'terser-webpack-plugin';
import webpack = require('webpack');

const srcPath = path.join(__dirname, 'src');
const nodeModulesPath = path.join(__dirname, 'node_modules');

const config: webpack.Configuration = {
  mode: 'production',
  devtool: 'source-map',
  entry: [path.join(srcPath, 'index.tsx')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'assets/[name].[contenthash].js',
    chunkFilename: 'assets/[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
        AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
        API_BASE_URI: JSON.stringify(process.env.API_BASE_URI),
        GA_ID: JSON.stringify(process.env.GA_ID),
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css',
      chunkFilename: 'assets/[name].[contenthash].css',
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
        removeComments: true,
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
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
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: srcPath,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
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
