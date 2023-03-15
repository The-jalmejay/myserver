var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});
var port = process.env.port || 2410;
const pageSize = 5;
let id = 745;
let products = [
  {
    id: "A101",
    name: "Pepsi 300ml",
    price: 20,
  },
  {
    id: "A232",
    name: "Diet Coke 300ml",
    price: 25,
  },
  {
    id: "A102",
    name: "Pepsi 500ml",
    price: 40,
  },
  {
    id: "A237",
    name: "Coke 1l",
    price: 75,
  },
  {
    id: "B034",
    name: "Fruit and Nuts - 40g",
    price: 15,
  },
  {
    id: "B035",
    name: "Crackles - 100g",
    price: 45,
  },
  {
    id: "B036",
    name: "Nutties - 20g",
    price: 10,
  },
  {
    id: "B173",
    name: "25gm bar",
    price: 35,
  },
];

let myser = [];

app.get("/productApp/products", function (req, res) {
  res.send(products);
});
app.post("/productApp/products", (req, res) => {
  const product = req.body;
  products.push(product);
  console.log("prod", product);
  res.send(product);
});
app.get("/productApp/products/:id", function (req, res) {
  let id = req.params.id;
  let obj = products.find((obj1) => obj1.id === id);
  obj ? res.send(obj) : res.send("not found");
});
app.put("/productApp/products/:id", function (req, res) {
  console.log("Put called");
  let id = req.params.id;
  const product = req.body;
  console.log(id, product);
  let index = products.findIndex((obj1) => obj1.id === id);
  if (index >= 0) {
    products[index] = product;
    res.send(product);
  } else res.send("not found");
});
app.delete("/productApp/products/:id", function (req, res) {
  let id = req.params.id;
  let index = products.findIndex((obj1) => obj1.id === id);
  if (index >= 0) {
    let product = products.splice(index, 1);
    res.send(product);
  }
  res.send("not found");
});

app.post("/myserver", function (req, res) {
  const data = req.body;
  console.log(data);
  myser.push(data);
  console.log("prod", data);
  res.send(data);
});
app.get("/myserver", function (req, res) {
  res.send(myser);
});

app.listen(port, () => console.log(`Node app listening on port ${port}!`));
