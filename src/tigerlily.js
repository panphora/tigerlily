/*

// uses existing db if present
const db = tigerlily('jMpHXDYguqtS', {
  defaults: {
    some: [],
    thing: {
      another: 8
    }
  }
});

db.x = "hello";
// page reload
db.x === "hello"; // true

db.num = 0;
db.num++;

tigerlily.on("*", ({name, oldValue, newValue}) => {});

tigerlily.on("num", ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

tigerlily.on(["x", "num"], ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

*/

import deepForEach from 'deep-for-each';
import Floodplains from "floodplains";
const floodplains = new Floodplains();

function tigerlily (dbName, options = {}) {
  dbName = dbName || "tigerlily";

  // get default options
  const { defaults = {} } = options;

  // get initial db state
  let state = JSON.parse(localStorage.getItem(dbName) || "{}");

  // assign defaults as starting data (don't overwrite existing data)
  state = Object.assign(defaults, state);

  function boundHandler (rootRef) {
    return {
      get (obj, prop) {
        if (isObjectOrArray(obj[prop])) {
          // if nested value is an object or array, wrap it in a Proxy
          return new Proxy(obj[prop], boundHandler(rootRef));
        } else {
          return obj[prop];
        }
      },
      set (obj, prop, value) {
        let oldValueRef = obj[prop];
        let oldValue = isObjectOrArray(oldValueRef) ? JSON.parse(JSON.stringify(oldValueRef)) : oldValueRef;
        let newValue = isObjectOrArray(value) ? JSON.parse(JSON.stringify(value)) : value;

        obj[prop] = value;
        localStorage.setItem(dbName, JSON.stringify(rootRef));

        let path = getPathOfNestedObject(rootRef, value) || prop;
        floodplains.emit(path, {prop, path, oldValue, value: newValue});

        return true;
      }
    }
  }

  let proxiedObject = new Proxy(state, boundHandler(state));

  return proxiedObject;

}

tigerlily.on = function (path, cb) {
  floodplains.on(path, function (val) {
    cb(val.value);
  });
}

// UTILS

function isObjectOrArray (val) {
  return typeof val === 'object' && val !== null;
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

export default tigerlily;


