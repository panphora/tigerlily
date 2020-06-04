import tigerlily from "../../dist/tigerlily.modern.js";

window.localStorage.clear();

const state = tigerlily('jMpHXDYguqtS', {
  defaults: {
    // some: [],
    // thing: {
    //   another: 8
    // }
  }
});

state.on("z", ({name, value}) => {
  console.log(123, name, value);
});

state.x = {};
state.x.y = {};
state.x.y.z = {a: 123};



window.state = state;