const router = require("express").Router();
const Blog = require("../models/Blog");

// Your routing code goes here
router.get("/blog", (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;
  const search = req.query.search;
  const query = search ? { topic: { $regex: search, $options: "i" } } : {};
  Blog.find(query)
    .skip(skip)
    .limit(limit)
    .then((data) => {
      res.status(200).json({
        message: "fetched results",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    });
});

router.post("/blog", (req, res) => {
  let data = new Blog(req.body);
  data
    .save()
    .then((result) => {
      res.status(201).json({
        status: "success",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "failed",
        result: err,
      });
    });
});

router.put("/blog/:_id", (req, res) => {
  Blog.updateOne(req.params, {
    $set: req.body,
  })
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        message: err,
      });
    });
});

router.delete("/blog/:_id", (req, res) => {
  Blog.deleteOne(req.params)
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Error",
        message: err,
      });
    });
});

module.exports = router;
