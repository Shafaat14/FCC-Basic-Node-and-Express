require('dotenv').config();
let express = require('express');
let bodyparser = require( 'body-parser')
let app = express();
let absolutePath = __dirname + '/views/index.html';


app.use(bodyparser.urlencoded({extended: false}));
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {

let {method, path, ip} = req;

  console.log(method + " " + path + " -" + ip) 
  next();
})

app.get("/", (req, res) => {
  res.sendFile(absolutePath);
});



app.get("/:word/echo", (req, res) => {
  res.send({echo: req.params.word})
})

app.get("/name", (req, res) => {
  res.json({name: req.query.first + " " + req.query.last})
})

app.post( "/name", (req, res) => {
  res.json({name: req.body.first + " " + req.body.last})
  console.log(req.body)
})

app.get("/json", (req, res) => {
  const message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message });
});

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({time: req.time});
})

console.log("Hello World");

module.exports = app;
