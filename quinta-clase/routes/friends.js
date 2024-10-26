const express = require('express');
const router = express.Router();

const friendsController = require('../controllers/friendsController');

router.get('/:user', (req, res, next)=>{
    let promesas = [];
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsOK(req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsWait(req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsAccept(req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));
    promesas.push(new Promise((resolve, reject) =>{        
        friendsController.getFriendsNot(req.params.user, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }));

    Promise.all(promesas).then((data)=>{
        const ActualUser = req.params.user;            
        let friendsOK = data[0];
        let friendsWait = data[1];
        let friendsAccept = data[2];   
        let friendsNot = data[3];
        res.render('friends/friends', {friendsOK, friendsWait, friendsAccept, friendsNot, ActualUser});                        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/add/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.addFriends(req.params, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends/'+req.params.user);
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.post('/accept/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.acceptFriends(req.params, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends/'+req.params.user);
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});


router.post('/decline/:user/:id', (req, res, next)=>{
    new Promise((resolve, reject) => {
        friendsController.declineFriends(req.params, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        res.redirect('/friends/'+req.params.user);
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;