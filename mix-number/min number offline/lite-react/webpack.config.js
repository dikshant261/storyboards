const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // Main entry point should be index.js to mount React app
  entry: {
    main: "./src/index.js", // main entry for React app
    storyBoard: "./src/storyBoard/index.js", // your storyBoard components
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js", // for dynamic imports
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-react", { runtime: "classic" }]],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"], // Extract CSS files
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      chunks: ["main"], // only main bundle in HTML, components loaded dynamically
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0, // allows splitting even small modules
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    open: true,
  },
};
