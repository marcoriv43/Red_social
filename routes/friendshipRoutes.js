const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');

// Rutas de amistad
router.post('/send-request', friendshipController.sendFriendRequest);
router.post('/remove-friend', friendshipController.removeFriend);
router.get('/feed/:userId', friendshipController.getFriendFeed);

module.exports = router;
