/*

// uses existing db if present
let db = new tigerlily("jMpHXDYguqtS", {
  defaults: {
    x: 123
  }
}); 

db.x = "hello";
// page reload
db.x === "hello"; // true

db.num = 0;
db.num++;


db.on("num", ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

db.on(["x", "num"], ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

*/

export default (dbName, options = {}) => {
  if (typeof dbName !== "string") {
    throw new Error('tigerlily requires a database name');
  }

  // get default options
  const { defaults = {} } = options;

  // get initial db state
  let state = JSON.parse(localStorage.getItem(dbName) || "{}");

  // assign defaults as starting data (don't overwrite existing data)
  state = Object.assign(defaults, state);

  function boundHandler (rootRef) {
    return {
      get (obj, prop) {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
          // if nested object, wrap it in a Proxy
          return new Proxy(obj[prop], boundHandler(rootRef));
        } else {
          return obj[prop];
        }
      },
      set (obj, prop, value) {
        obj[prop] = value;
        localStorage.setItem(dbName, JSON.stringify(rootRef));
        return true;
      }
    }
  }

  let proxiedObject = new Proxy(state, boundHandler(state));

  proxiedObject.on = function () {};

  return proxiedObject;

}



