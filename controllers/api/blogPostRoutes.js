const router = require("express").Router();
const { BlogPost, User, Comment } = require("../../models");

//view all blog posts (get all)
router.get("/", async (req, res) => {});

//view one blog post (get one)
router.get("/:id", async (req, res) => {});

//create blog post (post)
router.post("/", async, (req, res) => {});

//edit blog post (put)
router.put("/:id", async (req, res) => {});

//delete blog post (delete)
router.delete("/:id", async, (req, res) => {});

module.exports = router;
