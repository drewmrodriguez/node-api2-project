// implement your posts router here
const express = require('express');
const Posts = require('./posts-model');

const router = express.Router();

//[GET] /api/posts  fetches all posts, returns an array of all post objects
router.get('/api/posts', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "The posts information could not be retrieved"
        });
    });
});

//[GET] /api/posts/:id  fetches individual posts by id, returns post object


//[GET] /api/posts/:id/comments  returns array of comment objects


//[POST] /api/users  creates new post. returns newly created post object


//[PUT] /api/posts/:id  updates post with the specific id


//[DELETE] /api/posts/:id  removes post with the specific id