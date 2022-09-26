const router = require("express").Router();
const { BlogPost, User, Comment } = require("../../models");

//create blog post (post)
router.post("/", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);

    return res.status(200).json(newBlogPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//view all blog posts (get all) //!!but get all post for dashboard, i.e. written by a specific user
router.get("/", async (req, res) => {
  try {
    const allBlogPostsID = await BlogPost.findAll();

    return res.status(200).json(allBlogPostsID);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//view one blog post (get one)
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);

    return res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//edit blog post (put)
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
