const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require('cors');
const {CrawlerFactory} = require("./crawler/crawler.factory");
const {CRAWLER_TYPE} = require("./crawler/crawler-type");

const PORT = process.env.PORT || 5000;

(async () => {

  await mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      })
      .then(() => console.log('MongoDB initialized successfully.'))
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

  app.get("/api/compare", async (req, res, next) => {
    try {
      let title = req.query.title;

      const [market1, market2, market3, market4] = await Promise.all([
        CrawlerFactory.getCrawler(CRAWLER_TYPE.LOTTE)
            .then(crawler => crawler.search(title)),
        CrawlerFactory.getCrawler(CRAWLER_TYPE.NONGSARANG)
            .then(crawler => crawler.search(title)),
        CrawlerFactory.getCrawler(CRAWLER_TYPE.CYSO)
            .then(crawler => crawler.search(title)),
        CrawlerFactory.getCrawler(CRAWLER_TYPE.SSG)
            .then(crawler => crawler.search(title)),
      ]);

      res.json({ response: { market1, market2, market3, market4 } });
    } catch (exception) {
      next(exception);
    }

  });

  app.use(function (error, req, res, next) {
    console.error(error.message, error);
    res.status(500);
    res.json({
      status: 500,
      message: 'Internal Server Error',
    });
  });

  app.listen(PORT, () => console.log(`Server Listening on ${PORT}`));
})();
