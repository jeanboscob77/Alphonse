module.exports = {
    presets: [
      '@babel/preset-env', // Aha irahindura syntax ya ES6+ igakorana na environment yose
      '@babel/preset-react', // Niba ukoresha React
    ],
    plugins: [
      '@babel/plugin-transform-runtime', // Iyi ituma ikoresha runtime ya Babel ikora neza
    ],
  };
  