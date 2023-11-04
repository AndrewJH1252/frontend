// cookie.js

const Cookie = {
    // Set a cookie with options
    set(name, value, options = {}) {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
      }
  
      if (options.expires instanceof Date) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      }
  
      if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
      }
  
      if (options.domain) {
        cookieString += `; domain=${options.domain}`;
      }
  
      if (options.path) {
        cookieString += `; path=${options.path}`;
      }
  
      if (options.secure) {
        cookieString += '; secure';
      }
  
      if (options.httpOnly) {
        cookieString += '; httpOnly';
      }
  
      document.cookie = cookieString;
    },
  
    // Get the value of a cookie by name
    get(name) {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName, cookieValue] = cookie.split('=');
        if (decodeURIComponent(cookieName) === name) {
          const secureFlag = cookie.split(';').some(part => part.trim() === 'secure');
          if (!secureFlag || (secureFlag && window.location.protocol === 'https:')) {
            return decodeURIComponent(cookieValue);
          }
        }
      }
      return null; // Return null if the cookie is not found
    },
    
      listAll() {
        const cookies = document.cookie.split('; ');
        const cookieList = {};
        cookies.forEach(cookie => {
          const [name, value] = cookie.split('=');
          cookieList[decodeURIComponent(name)] = decodeURIComponent(value);
        });
        return cookieList;
      },
      
      exists(name) {
        return this.get(name) !== null;
      },

      setSessionData(selectedCategory, searchQuery) {
        Cookie.set('selectedCategory', selectedCategory);
        Cookie.set('searchQuery', searchQuery);
      },
    
      // Get session data from cookies
      getSessionData() {
        const selectedCategory = Cookie.get('selectedCategory');
        const searchQuery = Cookie.get('searchQuery');
        return { selectedCategory, searchQuery };
      },
      
      
  
    // Delete a cookie by name
    delete(name, options = {}) {
      // To delete a cookie, we need to set its expiration to a past date
      options.expires = new Date(0); // Set to January 1, 1970
      this.set(name, '', options);
    }
  };
  
  // Example usage
  Cookie.set('username', 'john_doe', { expires: new Date(Date.now() + 86400e3), path: '/' });
  console.log(Cookie.get('username')); // Output: john_doe
  
  // Delete the cookie
  Cookie.delete('username');
  console.log(Cookie.get('username')); // Output: null
  
  export default Cookie;