module.exports = function (api) {
    api.cache(true);
  
    const presets = [
      "@babel/preset-env", // Transpile modern JavaScript features
      "@babel/preset-react" // Transpile JSX
    ];
  
    const plugins = [
      // Add any Babel plugins you need here
      "@babel/plugin-proposal-class-properties", // Support class properties syntax
      "@babel/plugin-syntax-dynamic-import", // Support dynamic imports
      [
        "module-resolver", // Configure module resolver for clean imports
        {
          alias: {
            // Example alias for simplifying imports
            components: "./src/components",
            utils: "./src/utils",
            // Add more aliases as needed
          }
        }
      ]
    ];
  
    return {
      presets,
      plugins
    };
  };
  