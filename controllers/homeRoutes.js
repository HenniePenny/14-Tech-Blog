const { BlogPost } = require("../models");
const router = require("express").Router();
const withAuth = require("../utils/auth");

// route for dashboard - post that are written by loggedin user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const data = await BlogPost.findAll({
      where: { blogger_id: req.session.user_id },
    });

    const blogs = data.get({ plain: true });

    res.render("dashboard", {
      blogs,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

module.exports = router;
