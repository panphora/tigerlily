# Tigerlily

Create an object that preserves its data across page loads!

1. Update your object's data
2. All the data is mirrored to localStorage
3. Reload the page and the data is the same!

Comes with an event emitter, so you can listen for changes to your object!

## Demo

[See It in Action](https://tigerlily.davidmiranda.info/demo/)

## Install

```
npm install tigerlily
```

## How to Use

```js
import tigerlily from "tigerlily";

// init with unique key, so you can have multiple instances
const persistentObject = tigerlily('jMpHXDYguqtS', {
  // preload data with defaults
  // these will never override existing data
  defaults: {
    someArray: [],
    someData: {
      name: "James"
    }
  }
});

// 1. define a property
persistentObject.message = "hello, world!";

// 2. reload the page
window.location.reload();

// 3. the properties value is preserved 😯✅
persistentObject.message === "hello, world!"; // true

```

## How it Works

### `tigerlily`

```js
const persistentObject = tigerlily('jMpHXDYguqtS');
```

Define an object that will survive new page loads. 

Pass in a unique string to initialize it, so you can have multiple instances on the same page. If you don't pass in a unique string, you'll just be able to have a single instance.

### `on`

```javascript
// listen for changes to all properties
tigerlily.on("*", ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

// listen for changes to the "message" property
tigerlily.on("message", ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});

// listen for changes to the property "username" nested under the "profile" property
tigerlily.on("profile.username", ({name, oldValue, newValue}) => {
  console.log({name, oldValue, newValue});
});
```

Listen for changes to your object's properties. You can listen to changes to nested properties by adding a period (i.e. `.`) between each property name.

## Inspired by

This library is a fork of [local-storage-proxy](https://github.com/bcomnes/local-storage-proxy)

## License

MIT

## Happy Coding ✌️