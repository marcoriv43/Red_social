const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// Rutas de usuario
router.get('/', (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.getPosts("string", (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.render('feed', {data});                        
    }).catch((error)=>{
        res.render('error', {error});
    });
});

router.post('/', (req, res, next)=>{
    new Promise((resolve, reject) => {
        postController.createPost(req.body, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post');
    }).catch((error)=>{
        res.render('error', {error});
    });
});


module.exports = router;