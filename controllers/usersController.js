const conexion = require('../db/database');

class userController{

    createUsers(req, res) {
        let err ="";
        let data=[];
        const { username, password, email } = req;        
        let newUser = {
            "username_users": username,
            "password_users": password,
            "email_users": email
        }        
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO users set ?', [newUser], (error, results, fields) => {
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

    confirmUsers(req, res) {
        let err = "";
        let data = [];
        //Buscar el usurio por email
        const {username, password} = req;
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users WHERE username_users = ? AND password_users = ?', [username, password], (error, results, fields) => {
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

module.exports = new userController();