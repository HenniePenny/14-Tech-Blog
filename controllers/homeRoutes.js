const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//get all blog posts for the homepage (what can be viewed without logging in)
router.get("/", async (req, res) => {
  try {
    const allBlogPosts = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogPosts = allBlogPosts.map((blogPost) =>
      blogPost.get({ plain: true })
    );
    console.log(blogPosts);

    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });

    // return res.status(200).json(allBlogPosts);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//view all blog posts for dashboard, i.e. written by a specific user
//!use with middleware
router.get("/dashboard", async (req, res) => {
  try {
    const allBlogPostsID = await BlogPost.findAll(req.body, {
      where: {
        blogger_id: req.params.blogger_id,
      },
    });

    // Serialize data so the template can read it
    const myBlogPosts = allBlogPostsID.map((myPosts) =>
      myPosts.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      myBlogPosts,
      logged_in: req.session.logged_in,
    });

    // return res.status(200).json(myBlogPosts);
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
});

//view one blog post (get one)
//!use with middleware
router.get("/blog/:id", async (req, res) => {
  try {
    const oneBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content"],
        },
      ],
    });

    const blogPost = oneBlogPost.get({ plain: true });

    res.render("single-blogpost", {
      ...blogPost,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

//view the page for create new post
//!use with middleware
router.get("/newpost", async (req, res) => {
  res.render("new-blogpost");
  return;
});

//view the edit post page
//!use with middleware
router.get("/edit/:id", async (req, res) => {
  try {
    const updatedBlogPostData = await BlogPost.findByPk(req.params.id);

    const blogPost = updatedBlogPostData.get({ plain: true });

    //have a handlebars template for 404
    //res.render("not-found")
    if (!blogPost) {
      res.status(404).json({ message: "Blog post not found." });
    }

    res.render("edit-blogpost", {
      ...blogPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

//login & sign up
router.get("/login", async (req, res) => {
  //if user is already logged in, redirect to dashboard
  if (req.session.logged_in) {
    res.redirect("dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
