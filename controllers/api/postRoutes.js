const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new post
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      header: req.body.header,
      body: req.body.body,
      user_id: req.session.user_id,
    });

    if (newPost) {
      res.status(200).json(newPost);
    } else {
      res.status(400).json({ message: "No post submitted." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "header", "body", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "comment", "user_id", "post_id", "created_at"],
          include: [
            {
              model: User,
              attributes: ["username"]
            }
          ]
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
    res.status(500).json('test');
  }
});

// UPDATE a post
router.put('/:id', (req, res) => {
  Post.update(
    {
      header: req.body.header,
      body: req.body.body
    },
    {
      where: {
        id: req.body.post_id,
      },
    }
  )
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// DELETE a post
router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(data => {
      if (!data) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;