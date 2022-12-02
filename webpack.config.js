const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "uniteus",
    projectName: "client-utils",
    webpackConfigEnv,
    argv,
  });
  const sassLoaderRule = {
    test: /\.scss$/,
    include: path.join(__dirname, './src'),
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader'},
      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ],
  };
  defaultConfig.module.rules.push(sassLoaderRule);
  return defaultConfig;

  // return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
  // });
};
