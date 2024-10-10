const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Rutas de publicaciones
router.post('/', postController.createPost);
router.get('/', postController.getPosts);
router.post('/:id/comment', postController.commentPosts);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;