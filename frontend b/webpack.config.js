module.exports = {
  // ... suas outras configurações
  module: {
    rules: [
      // ... suas outras regras
      {
        test: /lru-cache\/dist\/mjs\/index\.js$/,
        use: 'null-loader' // Ignora o arquivo
      }
    ]
  }
};
