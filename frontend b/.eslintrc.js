module.exports = {
    // outras configurações do ESLint
  
    plugins: [
      // outros plugins
      'react-hooks',
    ],
  
    rules: {
      // outras regras
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn', // ou 'error' dependendo do seu padrão
    },
  };