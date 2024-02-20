const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const router = require("./Routes/router");
const session = require("express-session");

const app = express();
const PORT = 4000;
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded());

app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: "wwwwww",
    saveUninitialized: false, //на фолз поменяй
    resave: true,
    cookie: {
      secure: false,
      maxAge: 3600000,
    },
  })
);

app.use(express.static(__dirname + "/view/static"));

app.set("views", "./view/html");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(router);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://ansaramanzholov2005:323431@cluster1.wdbaku4.mongodb.net/?retryWrites=true&w=majority"
    );

    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}...`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
