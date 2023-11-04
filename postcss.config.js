module.exports = {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],

    extend: {
      // ...other styles...
  
      // Define transition classes
      transition: {
        'fade-in': 'opacity-0 transition-opacity duration-300 ease-in-out',
        'fade-in-active': 'opacity-100 transition-opacity duration-300 ease-in-out',
        'fade-out': 'opacity-100 transition-opacity duration-300 ease-in-out',
        'fade-out-active': 'opacity-0 transition-opacity duration-300 ease-in-out',
      },
    },
  };
  