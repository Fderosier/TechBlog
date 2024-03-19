const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

// GET all posts for logged in user
router.get("/", withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "header", "body", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", {
      posts,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET for editing or deleting single post of logged in user
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const userPost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "header", "body", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "post_id", "created_at"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    if (userPost) {
      const post = userPost.get({ plain: true });

      res.render("edit", {
        post,
        logged_in: true,
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

// GET route for adding a new post
router.get("/create", (req, res) => {
  res.render("create");
});

module.exports = router;