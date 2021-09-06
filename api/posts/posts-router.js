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
        })
    });
});

//[GET] /api/posts/:id  fetches individual posts by id, returns post object
router.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    Posts.findById(id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "The post information could not be retrieved" 
        })
    });
});

//[GET] /api/posts/:id/comments  returns array of comment objects
router.get('/api/posts/:id/comments', (req, res) => {
    const { id } = req.params;
    Posts.findPostComments(id)
    .then(comments => {
        if(!comments.length) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            res.status(200).json(comments)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
           message: "The comments information could not be retrieved" 
        })
    });
});

//[POST] /api/posts  creates new post. returns newly created post object
router.post('/api/posts', async (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        try {
            const newId = await Posts.insert({ title, contents })
            const newPost = await Posts.findById(newId.id)
            res.status(201).json(newPost);
    }   catch (err) {
            console.log(err);
            res.status(500).json({
                message: "There was an error while saving the post to the database"
            })
        }
    };
});

//[PUT] /api/posts/:id  updates post with the specific id
router.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        try {
            const count = await Posts.update(id, { title, contents })
            if (count === 1) {
                const updatedPost = await Posts.findById(id)
                res.status(200).json(updatedPost);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "The post information could not be modified"
            })
        }
    };
});

//[DELETE] /api/posts/:id  removes post with the specific id
router.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Posts.findById(id)
        const count = await Posts.remove(id)
        if (count === 1) {
            res.status(200).json(deletedPost)
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The post could not be removed"
        })
    };
});

module.exports = router;