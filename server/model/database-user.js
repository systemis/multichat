const connection = require('../config/database.js');
const tableName  = "UserData";
class UserMD {
    constructor(){
        connection.query("CREATE TABLE `"+tableName+"` ( `id` INT NULL AUTO_INCREMENT , `name` TEXT NOT NULL , `email` TEXT NOT NULL , `password` TEXT NOT NULL , `andress` TEXT NULL DEFAULT NULL , `phone` TEXT NULL DEFAULT NULL , `date` TEXT NULL DEFAULT NULL , `gender` TEXT NULL DEFAULT NULL , `language` TEXT NULL DEFAULT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=armscii8 COLLATE armscii8_general_ci", (err, result) => {
            if(err) {
                return console.log("Create user table fail");
            }

            return console.log("Create user table success");
        })
    }

    newUser(bundle, fn){
        this.checkAlreadyExistsEmail(bundle.email, rs => {
            if(rs){
                connection.query("INSERT INTO " + tableName + " SET ?", bundle, (err, result, field) => {
                    if(err){
                        console.log("Error when register")
                        return console.log(err);
                    }

                    console.log(field);
                    fn(false, result);
                })
            }else{
                fn(true, "Co ");
            }
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