const DotEnv = require("dotenv-webpack");
const Path = require("path");

let config = {
  mode: "production",
  entry: "./src/js/index.js",
  output: {
    path: Path.resolve(__dirname, "dist/js"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: []
};

module.exports = (env, argv) => {
  // Set mode
  config.mode = env.mode;

  // Use appropriate dotenv file
  let envPath = config.mode === "development" ? "./.dev.env" : "./.env";
  config.plugins.push(new DotEnv({path:envPath}));

  return config;
};