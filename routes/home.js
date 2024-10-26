const express = require('express');const app = require('../app');
const router = express.Router();

const  usersController = require('../controllers/usersController');

router.get('/', (req, res, next)=>{
    res.render('home/home');
});

router.post('/', (req, res, next)=>{
    new Promise((resolve, reject) => {
        usersController.confirmUsers(req.body, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    }).then((data)=>{
        if (data[0]!==undefined) {
            res.redirect('/post/'+data[0].id_users);            
        } else {
            res.redirect('/?alert="No existe el usuario"');

        }        
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

router.get('/crearUsuario', (req, res, next)=>{    console.log(1);    
    res.render('home/newUser');
});

router.post('/crearUsuario', (req, res, next)=>{
    new Promise((resolve, reject) => {
        usersController.createUsers(req.body, (error, data)=>{        
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }

        });
    }).then((data)=>{
        res.redirect('/');
    }).catch((error)=>{
        res.render('layouts/error', {error});
    });
});

module.exports = router;