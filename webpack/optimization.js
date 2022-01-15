const TerserPlugin = require("terser-webpack-plugin");

module.exports = function () {
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ['Scale', 'Knob', 'Labels', 'Tooltip', 'Fill']
            },
          },
        }),
      ],
    },
  };
};