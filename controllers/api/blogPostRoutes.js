const router = require("express").Router();
const { BlogPost, User, Comment } = require("../../models");

//create blog post (post)
//!use with middleware
router.post("/", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);

    return res.status(200).json(newBlogPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//edit blog post (put)
//!use with middleware
router.put("/:id", async (req, res) => {
  try {
    //takes in body that I want to update and an object where I want to update
    const updatedBlogPost = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json(updatedBlogPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//delete blog post (delete)
//!use with middleware
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedBlogPost) {
      return res.status(404).json({ message: "The blog post does not exist." });
    }

    return res
      .status(200)
      .json({ message: "The blog post was deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
