const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// Rutas de usuario
router.get('/:user', (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.getPosts(req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        const ActualUser = req.params.user;
        res.render('feed/feed', {data, ActualUser});                        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/:user', (req, res, next)=>{
    new Promise((resolve, reject) => {
        postController.createPost(req.body,req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post/'+req.params.user);
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/edit/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.getUpdatePost(req.params, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{        
        data = data[0]
        const ActualUser = req.params.user;
        res.render('feed/feedEdit', {data, ActualUser});
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/edit/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) =>{        
        postController.updatePost(req.params, req.body, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post/'+req.params.user);
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/delete/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) => {
        postController.deletePost(req.params, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/post');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;