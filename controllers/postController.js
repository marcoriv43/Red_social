const conexion = require('../db/database');

class PostController {

    // Listar todas las publicaciones
    getPosts(req, res) {
        let err ="";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT DISTINCT id_users, id_post, title_post, description_post, url_post, id_users_post FROM users LEFT JOIN friends ON id_users = id_users_friend1 AND status_friends=1 OR id_users = id_users_friend2 AND status_friends=1 LEFT JOIN post ON id_users_friend1 = id_users_post OR id_users_friend2 = id_users_post WHERE id_users = ? UNION SELECT DISTINCT id_users, id_post, title_post, description_post, url_post, id_users_post FROM users JOIN post ON id_users = id_users_post WHERE id_users = ? AND NOT EXISTS (SELECT 1 FROM friends WHERE id_users = id_users_friend1 AND status_friends=1 OR id_users = id_users_friend2 AND status_friends=1)ORDER BY id_post DESC;', [req, req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });        
    }

    // Crear una nueva publicación
    createPost(body, user, res) {
        let err ="";
        let data=[];
        const { title, description, url } = body;        
        let newPost = {
            "title_post": title,
            "description_post": description,
            "url_post": url,
            "id_users_post": user
        }
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO `post` set ?', [newPost], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });      
    }

    
    // Editar una publicación
    getUpdatePost(params, res) {
        let err = "";
        let data = [];
        //Buscar el usurio por Id
        const id = params.id;        
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM `post` WHERE `id_post` = ?', [id], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });                     
    }

    // Editar una publicación
    updatePost(params, body, res) {
        let err = "";
        let data = [];
        const id = params.id;
        const {title, description, url} = body;
        let newPost = {
            "title_post": title,
            "description_post": description,
            "url_post": url
        }
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE `post` set ? WHERE `id_post`=?',[newPost, id], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });   
    }

    // Eliminar una publicación
    deletePost(req, res) {
        let err ="";
        let data=[];
        const id = req.id;
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM `post` WHERE `id_post` = ?', [id], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
            });
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });   
    }

}

module.exports = new PostController();