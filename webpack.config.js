const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack'); // Import webpack


module.exports = {
    entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development', // Set to 'development' for development builds
  devtool: 'source-map', // Generate source maps for better debugging
 
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },


  
  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      buffer: require.resolve('buffer/'), // Add this line for buffer polyfill
      stream: require.resolve('stream-browserify'), // Add this line for stream polyfill
    },
  },
  devServer: {
    static: './dist', // Specify the directory to serve
    port: 3000,
    open: true,
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Transpile JavaScript using Babel
      },
      {
        test: /\.css$/,
        use: [
            // In development, use 'style-loader' to inject styles into the DOM
            process.env.NODE_ENV === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader', // Process CSS files
          ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Convert images < 8kb to base64 strings
              name: 'images/[name].[hash].[ext]', // Output path and file name
            },
          },
        ],
      },
      {
        test: /\.avif$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
            },
          },
          {
            loader: 'avif-loader',
          },
        ],
      },
      
      
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // HTML template
    }),
    new CleanWebpackPlugin(), // Clean the 'dist' folder before each build
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', // Extracted CSS filename
    }),
    new Dotenv(), // Load environment variables from .env file

    new CopyWebpackPlugin({
        patterns: [
          {
            from: 'node_modules/react-modal/style.css',
            to: 'css', // Change the 'to' path as needed
          },
        ],
      }),
  ],
  
};
