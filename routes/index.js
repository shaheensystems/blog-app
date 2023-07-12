const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

// Display all blog posts
router.get('/', async (req, res, next) => {
try {
const blogs = await Blog.find({});
res.render('index', { blogs });
} catch (err) {
console.log(err);
res.render('error');
}
});
//
router.get('/add-blog', (req, res) => {
  res.render('addBlog'); // Renders the 'addBlog.pug' view
});
// Create a new blog post
router.post('/', async (req, res, next) => {
const { title, content, author } = req.body;
const newBlog = new Blog({
title,
content,
author,
date: new Date()
});

try {
await newBlog.save();
res.redirect('/');
} catch (err) {
console.log(err);
res.render('error');
}
});

// View a single blog post
router.get('/:id', async (req, res, next) => {
try {
const blog = await Blog.findById(req.params.id);
res.render('blog', { blog });
} catch (err) {
console.log(err);
res.render('error');
}
});

// Update a blog post
router.post('/:id', async (req, res, next) => {
try {
await Blog.findByIdAndUpdate(req.params.id, { $set: req.body });
res.redirect('/');
} catch (err) {
console.log(err);
res.render('error');
}
});

// Delete a blog post
router.post('/:id/delete', async (req, res, next) => {
try {
await Blog.findByIdAndRemove(req.params.id);
res.redirect('/');
} catch (err) {
console.log(err);
res.render('error');
}
});

module.exports = router;