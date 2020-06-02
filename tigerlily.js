/*

Use this as basis:
https://github.com/bcomnes/local-storage-proxy

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





