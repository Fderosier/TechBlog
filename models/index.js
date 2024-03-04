const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(User, {
    constraints: false,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    constraints: false,
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Post.belongsTo(User, {
    constraints: false,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    constraints: false,
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    constraints: false,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    constraints: false,
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { Comment, Post, User} 