const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

const commentData = require('./commentData.json');
const postData = require('./postData.json');
const userData = require('./userData.json');

// function for seeding all models
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // seeding the user model
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // seeding the post model & randomly assigning a user to each created post
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // seeding the comment model
 const comment = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();