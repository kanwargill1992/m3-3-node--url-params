"use strict";
const express = require("express");
const morgan = require("morgan");

const { top50 } = require("./data/top50");

const q1 = (req, res) => {
  res.render("pages/top50", {
    title: "Top 50 Songs Streamed on Spotify",
    top50,
  });
};

const q2 = (req, res) => {
  console.log(req.params.rank);
  let rank = req.params.rank - 1;
  if (top50[rank]) {
    res.render("pages/songPage", {
      title: `Song# ${top50[rank].rank}`,
      song: top50[rank],
    });
  } else {
    res.status(404);
    res.render("pages/fourOhFour", {
      title: "I got nothing",
      path: req.originalUrl,
    });
  }
};

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// endpoints here
app.get("/top50", q1);
app.get("/songPage/:rank", q2);
// app.get("/top50/popular-artist",)
// handle 404s
app.get("*", (req, res) => {
  res.status(404);
  res.render("pages/fourOhFour", {
    title: "I got nothing",
    path: req.originalUrl,
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
