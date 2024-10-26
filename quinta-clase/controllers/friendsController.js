const conexion = require('../db/database');

class friendsController{

    getFriendsOK(req, res) {
        let err ="";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
                let FriendsOK = new Set();
                data.forEach(row =>{                                       
                    if (row.id_users_friend1 !== parseInt(req) && row.status_friends==1) {
                        FriendsOK.add(row.id_users_friend1);
                    }
                    if (row.id_users_friend2 !== parseInt(req) && row.status_friends==1) {
                        FriendsOK.add(row.id_users_friend2);
                    }
                });
                FriendsOK = Array.from(FriendsOK);
                if (FriendsOK.length>0) {
                    conexion.query('SELECT * FROM users WHERE id_users IN (?)', [FriendsOK], (error, results, fields) => {
                        if (error) {
                            err += error
                            reject(error);
                        } else {
                            data = results;               
                            resolve(data);               
                        }
                    });
                } else {
                    data = [];
                }
            });                        
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });        
    }

    getFriendsWait(req, res) {
        let err ="";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
                let friendsWait = new Set();
                data.forEach(row =>{                                       
                    if (row.id_users_friend2 !== parseInt(req) && row.status_friends==0) {
                        friendsWait.add(row.id_users_friend2);
                    }
                });
                friendsWait = Array.from(friendsWait);
                if (friendsWait.length>0) {
                    conexion.query('SELECT * FROM users WHERE id_users IN (?)', [friendsWait], (error, results, fields) => {
                        if (error) {
                            err += error
                            reject(error);
                        } else {
                            data = results;               
                            resolve(data);               
                        }
                    });
                } else {
                    data = [];
                }                
            });                        
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });        
    }

    getFriendsAccept(req, res) {
        let err ="";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
                let friendsAccept = new Set();
                data.forEach(row =>{                                       
                    if (row.id_users_friend1 !== parseInt(req) && row.status_friends==0) {
                        friendsAccept.add(row.id_users_friend1);
                    }
                });
                friendsAccept = Array.from(friendsAccept);
                if (friendsAccept.length>0) {
                    conexion.query('SELECT * FROM users WHERE id_users IN (?)', [friendsAccept], (error, results, fields) => {
                        if (error) {
                            err += error
                            reject(error);
                        } else {
                            data = results;               
                            resolve(data);               
                        }
                    });
                } else {
                    data = [];
                }                
            });                        
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });        
    }

    getFriendsNot(req, res) {
        let err ="";
        let data = [];
        return new Promise((resolve, reject) => {
            conexion.query('SELECT * FROM users LEFT JOIN friends ON id_users = id_users_friend1 OR id_users = id_users_friend2 WHERE id_users=?', [req], (error, results, fields) => {
                if (error) {
                    err += error
                    reject(error);
                } else {
                    data = results;               
                    resolve(data);               
                }
                let friendsNot = new Set();
                data.forEach(row =>{                                       
                    if (row.id_users_friend1 !== parseInt(req)) {
                        friendsNot.add(row.id_users_friend1);
                    }
                    if (row.id_users_friend2 !== parseInt(req)) {
                        friendsNot.add(row.id_users_friend2);
                    }
                });                 
                friendsNot = Array.from(friendsNot);                                                                                           
                if (friendsNot[0]==null) {                                    
                    friendsNot = [parseInt(req)];
                } else {
                    friendsNot.push(parseInt(req));                      
                }                                
                if (friendsNot.length>0) {
                    conexion.query('SELECT * FROM users WHERE id_users NOT IN (?)', [friendsNot], (error, results, fields) => {
                        if (error) {
                            err += error
                            reject(error);
                        } else {
                            data = results;               
                            resolve(data);               
                        }
                    });
                } else {
                    data = [];
                }
            });                        
            setTimeout(()=>{
                res(err != '' ? new Error(err):null, data);
            },250);
        });        
    }

    addFriends(req, res) {
        let err ="";
        let data=[];
        const newFriend = {
            "id_users_friend1": req.user,
            "id_users_friend2": req.id,
            "status_friends": 0
        }
        return new Promise((resolve, reject) => {
            conexion.query('INSERT INTO friends set ?', [newFriend], (error, results, fields) => {
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

    declineFriends(req, res) {
        let err ="";
        let data=[];
        const user = req.user;
        const id = req.id;
        return new Promise((resolve, reject) => {
            conexion.query('DELETE FROM friends WHERE id_users_friend1 = ? AND id_users_friend2 = ?', [id, user], (error, results, fields) => {
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

    acceptFriends(req, res) {
        let err ="";
        let data=[];
        const user = req.user;
        const id = req.id;
        const accept = {
            "status_friends": 1
        }
        return new Promise((resolve, reject) => {
            conexion.query('UPDATE friends SET ? WHERE id_users_friend1 = ? AND id_users_friend2 = ?', [accept,id, user], (error, results, fields) => {
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

module.exports = new friendsController();