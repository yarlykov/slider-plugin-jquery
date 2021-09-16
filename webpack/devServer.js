module.exports = function () {
  return {
    devServer: {
      static: './dist',
      port: 8082,
      open: 'index.html',
    },
  };
};
