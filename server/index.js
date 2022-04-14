const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');


const lotteData = require("./Market");
const SSGData = require("./Market2");
const saisoData = require("./Market3");
const nongsarangData = require("./Market4");


const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: true })); //application/x-www-form-urlencoded 이런 상태로 parsing
app.use(bodyParser.json()); //json파일로 parsing

app.use(cookieParser());

app.use(cors(corsOptions));



app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(bodyParser.json());


app.get('/', function (req, res, next) {
  // Handle the get for this route
});


app.post('/', function (req, res, next) {
  // Handle the post for this route
});
app.use('/api/users', require('./routes/users'));
app.use('/api/product', require('./routes/product'));

app.use('/uploads', express.static('uploads'));



// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  // });

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });

}

app.get("/api/compare", async (req, res) => {
  let title = req.query.title;


  // res.json({ response: { market1: await weMapData(title) } });
  // res.json({ response: { market2: await SSGData(title) } });

  // res.json({ response: { market3: await saisoData(title) } });

  res.json({ response: { market1: await lotteData(title), market2: await SSGData(title), market3: await saisoData(title), market4: await nongsarangData(title) } });

});



const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});