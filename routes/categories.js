const Category = require("../models/Category");
const router = require("express").Router();

router.post("/", async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    console.log(err);
  }

  router.get("/", async (req, res) => {
    try {
      const cats = await Category.find();
      res.status(200).json(cats);
    } catch (err) {
      console.log(err);
    }
  });
});
module.exports = router;
