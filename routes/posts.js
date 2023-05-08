const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        console.log(updatedPost);
        res.status(201).json(updatedPost);
      } catch (err) {
        console.log(err);
        res.status(401).json(err);
      }
    } else {
      res.status(401).json("you can only update your post");
    }
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username == req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(201).json("post has been deleted");
      } catch (err) {
        console.log(err);
        res.status(401).json(err);
      }
    } else {
      res.status(401).json("you can only delete your post");
    }
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find({});
    }
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
