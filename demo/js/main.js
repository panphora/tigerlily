import tigerlily from "../../dist/tigerlily.modern.js";

window.localStorage.clear();

const state = tigerlily('jMpHXDYguqtS', {
  defaults: {
    some: [],
    thing: {
      another: 8
    }
  }
});

tigerlily.on("x", ({name, value}) => {
  console.log(123, name, value);
});

tigerlily.on(["x.y", "x.y.z"], ({name, value}) => {
  console.log(234, name, value);
});

state.x = {};
state.x.y = {};
state.x.y.z = {a: 123};



window.state = state;