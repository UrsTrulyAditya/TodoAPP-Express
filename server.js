const express = require("express");
const app = express();

app.use(express.json());
let todos = [
  {
    id: 1,
    title: "Learn Express",
    completed: false,
  },
];
app.listen(3000,()=>{
    console.log("server is running happily!!")
});