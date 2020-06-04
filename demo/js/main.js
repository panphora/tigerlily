import tigerlily from "../../dist/tigerlily.modern.js";

const state = tigerlily('jMpHXDYguqtS', {
  defaults: {
    some: [], // Doesn't override saved state
    defaults: null
  }
})

console.log(state.some) // []
state.some.push('foo')
console.log(state.some) // [ 'foo' ]

state.x = {};
state.x.y = {};
state.x.y.fg = 123;

window.state = state;
window.tigerlily = tigerlily;