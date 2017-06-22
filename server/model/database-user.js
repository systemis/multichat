const connection = require('../config/database.js');
const tableName  = "UserData";
class UserMD {
    constructor(){
        connection.query("CREATE TABLE `"+tableName+"` ( `id` VARCHAR(200) NOT NULL, `name` TEXT NOT NULL , `email` TEXT NOT NULL , `password` TEXT NOT NULL , `andress` TEXT NULL , `phone` TEXT NULL , `birthday` TEXT NULL , `gender` TEXT NULL , `language` TEXT NULL , `avatar` TEXT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=armscii8 COLLATE armscii8_general_ci", (err, result) => {
            if(err) {
                return console.log("Create user table fail");
            }

            return console.log("Create user table success");
        })
    }

    newUser(bundle, fn){
        // set default avatar 
        var b = true;
        do{
            bundle.id = Math.random().toString().replace(".", "");
            this.checkAlreadyExistsId(bundle.id, bool => {
                if(bool){
                    this.checkAlreadyExistsEmail(bundle.email, rs => {
                        if(bundle.avatar === null || !bundle.avatar){
                            bundle.avatar = 'https://www.ihh.org.tr/resource/svg/user-shape.svg';
                        }

                        if(rs){
                            connection.query("INSERT INTO " + tableName + " SET ?", bundle, (err, result, field) => {
                                if(err){
                                    console.log(err);
                                    return fn(true, err);
                                }

                                fn(false, "success");
                            })
                        }else{
                            fn(true, "exists");
                        }
                    })
                }else{
                    b = bool;
                }
            })
        }while(b === false);
    }

    checkLogin(email, password, fn){
        connection.query("SELECT * FROM " + tableName + " WHERE email = ?", [email], (err, result, field) => {
            if(err) {
                return fn(true, JSON.stringify(result));
            }

            if(result.length > 0){
                if(password === result[0].password){
                    return fn(true, "OK", result[0]);
                }else{
                    return fn(true, "CORRECT", null);
                }
            }else{
                return fn(true, "NOT_REGISTER", null);
            }
        })
    }

    findUserById(id, fn){
        connection.query(`SELECT * FROM ${tableName} WHERE id = ?`,[id], (err, result) => {
            if(err) return fn(true, JSON.stringify(err));
            if(result.length < 0) return fn(false, "NOT_REGISTER");

            return fn(false, result[0]);
        })
    }

    checkAlreadyExistsEmail(email, fn){
        connection.query("SELECT * FROM " + tableName, (err, result) => {
            var rs = true;
            if(err){
                console.log("Select table faile");
                return console.log(err);
            }

            for(var i = 0; i < result.length; i++){
                if(result[i].email === email){
                    rs = false;
                }
            }

            return fn(rs);
        })
    }

    checkAlreadyExistsId(id, fn){
        connection.query("SELECT * FROM " + tableName, (err, result) => {
            var rs = true;
            if(err){
                console.log("Select table faile");
                return console.log(err);
            }

            for(var i = 0; i < result.length; i++){
                if(result[i].id === id){
                    rs = false;
                }
            }

            return fn(rs);
        })
    }

    getUserlist(fn){
        connection.query(`SELECT * FROM ${tableName} `, (err, result) => {
            if(err){
                return fn(true, "");
            }

            return fn(false, result);
        })
    }

    dropTable(fn){
        connection.query("DROP TABLE " + tableName, (err, result) => {
            if(err){
                console.log("Drop table faile");
                return fn(true, err);
            }

            return fn(false, result);
        })
    }
}

module.exports = new UserMD();