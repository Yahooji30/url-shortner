import express from "express";
import shortUrl from "../model/urlModel.js";
import shortUniqueId from "short-unique-id";
import normalizeURL from "normalize-url";
const router = express.Router();

function generateShortID(req, res, next) {
  let uid = new shortUniqueId({ length: 7 });
  req.body.shortCode = uid();
  next();
}

function normalURL(req, res, next) {
  req.body.url = normalizeURL(req.body.url, { forceHttp: true });
  next();
}

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/", generateShortID, normalURL, async (req, res) => {
  const foundURL = await shortUrl.findOne({
    fullURL: req.body.url,
  });

  if (foundURL) {
    console.log("Found");
    res.render("index", { shortCode: foundURL.shortCode });
  } else {
    console.log("Added");
    const newUrl = new shortUrl({
      shortCode: req.body.shortCode,
      fullURL: req.body.url,
    });
    await newUrl.save();
    res.render("index", { shortCode: req.body.shortCode });
  }
});

router.get("/:id", async (req, res) => {
  if (req.params.id.length == 7) {
    const url = await shortUrl.findOne({ shortCode: req.params.id });
    if (url) {
      res.redirect(url.fullURL);
    }
  } else {
    res.redirect("/");
  }
});

export default router;
