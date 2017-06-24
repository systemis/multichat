const connection = require('../config/database.js');
const tablename  = `RoomsData`;
class RomMD{
    constructor(){
        connection.query("CREATE TABLE `RoomsData` ( `id` VARCHAR(200) NOT NULL , `users` TEXT NOT NULL , `messages` TEXT NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci", (err, reult) => {
            if(err) return console.log(`Create table ${tablename} failure`);

            console.log(`Create table ${tablename} success`);
        })
    }

    newRoom(bundle, fn){
        bundle.messages = JSON.stringify([]);
        bundle.id       = bundle.id.toString();
        connection.query(`INSERT INTO ${tablename} SET ?`, bundle, (err, result) => {
            if(err){
                console.log(err);
                return fn(err, "");
            } 
            
            return fn(null, result);
        })
    }

    addMessage(id, message, fn){
        connection.query(`SELECT * FROM ${tablename} WHERE id = ?`, [id], (err, result) => {
            if(err) return fn(err, "");
            if(result <= 0) return fn("Error", "");

            var messages = JSON.parse(result[0].messages);
            
            messages.push(message);
            messages = JSON.stringify(messages);

            connection.query(`UPDATE ${tablename} SET messages = ? WHERE id = ?`, [messages, id], (er, rs) => {
                if(er) return fn(er, "");

                return fn(null, JSON.parse(messages));
            })
        })
    }

    dropTable(fn){
        connection.query("DROP TABLE " + tablename, (err, result) => {
            if(err){
                console.log("Drop table faile");
                return fn(err, 'err');
            }

            return fn(null, 'success');
        })
    }
}

module.exports = new RomMD();