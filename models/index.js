const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

//BlogPost belongs to one user (connection via the blogger_id)
BlogPost.belongsTo(User, {
  foreignKey: "blogger_id",
});

//A user can have many blog posts
User.hasMany(BlogPost, {
  foreignKey: "blogger_id",
  onDelete: "CASCADE",
});

//One BlogPost has many Comments (if I delete the BlogPost, I also delete the comments)
BlogPost.hasMany(Comment, {
  foreignKey: "blogpost_id",
  onDelete: "CASCADE",
});

//One user can leave many comments
User.hasMany(Comment, {
  foreignKey: "blogger_id",
  onDelete: "CASCADE",
});

//One comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: "blogger_id",
});

//One comment belongs to a blog post
Comment.belongsTo(BlogPost, {
  foreignKey: "blogpost_id",
});

module.exports = { User, BlogPost, Comment };
