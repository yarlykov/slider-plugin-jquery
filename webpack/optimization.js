const TerserPlugin = require("terser-webpack-plugin");

module.exports = function () {
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ['Scale', 'Knob', 'SecondKnob', 'Labels', 'Tooltip', 'Fill', 'SecondTooltip']
            },
          },
        }),
      ],
    },
  };
};