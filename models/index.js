const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

BlogPost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(User, {
  foreignKey: "blogger_id",
});

User.hasMany(Comment, {
  foreignKey: "blogger_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "blogger_id",
});

module.exports = { User, BlogPost };
