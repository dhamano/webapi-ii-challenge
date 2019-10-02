const router = require('express').Router();

const blogPosts = require('../data/db');

router.post('/', (req, res) => {
  const postInfo = req.body;

  if( !postInfo.title || !postInfo.title.trim()) {
    return res.status(400).json({ errorMessage: "Please provide a title for the post." })
  }
  if( !postInfo.contents || !postInfo.contents.trim()) {
    return res.status(400).json({ errorMessage: "Please provide content for the post." })
  }

  blogPosts.insert(postInfo)
    .then( post => {
      blogPosts.findById(post.id).then( post => res.status(201).json(post) );
    })
    .catch( err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
});

router.post('/:id/comments', (req, res) => {
  const {id} = req.params;
  const commentInfo = req.body;
  let post = {};

  blogPosts.findById(id)
    .then( thePost => {
      if(thePost.length > 0) {
        post = thePost;
        Object.assign(commentInfo, { "post_id": id});
        blogPosts.insertComment(commentInfo)
          .then( comment => {
            blogPosts.findCommentById(comment.id).then( thecomment => res.status(201).json(thecomment) );
          })
          .catch( err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database" });
          })
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/', (req, res) => {
  blogPosts.find()
    .then( posts => {
      res.status(200).json(posts);
    })
    .catch( err => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

router.get('/:id', (req, res) => {
  const {id} = req.params;

  blogPosts.findById(id)
    .then( post => {
      if(post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res) => {
  const {id} = req.params;

  blogPosts.findById(id)
    .then( post => {
      if(post.length < 1) {
        res.status(404).json({ message: "the post with the specified ID does not exist"});
      } else {
        blogPosts.findPostComments(id)
        .then( comments => {
          if(comments.length > 0) {
            res.status(200).json(comments);
          } else {
            res.status(404).json({ message: "The post with the specified ID does not have comments." })
          }
        })
        .catch( err => {
          res.status(500).json({ error: "The comments information could not be retrieved." })
        })
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be retrieved" })
    })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  blogPosts.findById(id)
    .then( found => {
      if(found.length > 0) {
        blogPosts.remove(id)
          .then( deleted => {
            res.status(200).json({ message: "The post has been deleted" });
          })
          .catch( err => {
            res.status(500).json({ error: "The post could not be removed" })
          })
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post could not be removed" });
    })
})

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const updatedPostContent = req.body;

  if( !updatedPostContent.title || !updatedPostContent.title.trim()) {
    return res.status(400).json({ errorMessage: "Please provide a title for the post." })
  }
  if( !updatedPostContent.contents || !updatedPostContent.contents.trim()) {
    return res.status(400).json({ errorMessage: "Please provide content for the post." })
  }

  blogPosts.findById(id)
    .then( post => {
      if(post.length > 0) {
        blogPosts.update(id, updatedPostContent)
          .then( updated => {
            blogPosts.findById(id)
              .then( post => {
                res.status(200).json(post);
              })
              .catch( err => {
                res.status(500).json({ errorMessage: "Something went wrong" });
              })
          })    
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch( err => {
      res.status(500).json({ error: "The post information could not be modified." })
    })

  
})

module.exports = router;