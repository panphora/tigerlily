import tigerlily from "../../dist/tigerlily.modern.js";

const persistentObject = tigerlily('jMpHXDYguqtS', {
  defaults: {
    someArray: [],
    someData: {
      name: "James"
    }
  }
});

tigerlily.on("*", ({prop, path, oldValue, value}) => {
  console.log("listening to '*'", {prop, path, oldValue, value});
});

tigerlily.on("message", ({prop, path, oldValue, value}) => {
  console.log("listening to 'message'", {prop, path, oldValue, value});
});

tigerlily.on("profile.username", ({prop, path, oldValue, value}) => {
  console.log("listening to 'profile.username'", {prop, path, oldValue, value});
});

persistentObject.message = "hello, world!";
persistentObject.profile = {};
persistentObject.profile.username = "Luke";


window.tigerlily = tigerlily;

