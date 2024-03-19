const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET for homepage that includes all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET for a single post
router.get("/posts/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "header", "body", "created_at", "user_id"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "post_id", "created_at"],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("post", {
        post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.status(400).json({ message: "Post not found." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route to login in a user
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashoard");
    return;
  } else {
    res.render("login");
  }
});

// GET route to sign up a new user
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;