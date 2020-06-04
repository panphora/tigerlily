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

import floodplains from "floodplains";
import deepForEach from 'deep-for-each';

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
        let oldValue = obj[prop];
        obj[prop] = value;
        localStorage.setItem(dbName, JSON.stringify(rootRef));

        if (prop !== "on") {
          let path = getPathOfNestedObject(rootRef, value) || prop;
          floodplains.emit(path, {prop, path, oldValue, value});
        }

        return true;
      }
    }
  }

  let proxiedObject = new Proxy(state, boundHandler(state));

  proxiedObject.on = floodplains.on;

  return proxiedObject;

}

function getPathOfNestedObject (root, nested) {
  if (root === nested) {
    return "";
  }

  let objPath = "";
  deepForEach(root, (value, key, subject, path) => {
    if (value === nested) {
      objPath = path;
    }
  });
  return objPath;
}



