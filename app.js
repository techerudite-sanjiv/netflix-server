const express = require("express");
const route = require("./routes");
const bodyParser = require("body-parser");
const database = require("./db");
var multer = require("multer");
const myMiddleware=require("./middlewares/authMiddleware")
var upload = multer();
require("dotenv").config()

const User = require("./models/User");
const app = express();
const port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
// app.use(myMiddleware);
app.use(bodyParser.json());
// app.use('/api/v1/tours', tourRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(route);
database.sync().then(() => {
  app.listen(port, () => {
    console.log(`i am running on express server ${port}`);
  })
}).catch((error)=>{
   console.log(error,"this is db error")
})
