module.exports = (app, onlineUsers) => {
    var path          = require('path');
    var fs            = require('fs');
    var imgurUploader = require('imgur-uploader');
    var multer        = require('multer');
    var userDM        = require('../model/database-user.js');
    var roomMD        = require('../model/database-room.js');

    var _imageName = ""

    var storage    = multer.diskStorage({
        destination: (req, file, done) => {
            done(null, path.resolve(__dirname, '../../public'));
        },

        filename: (req, file, done) => {
            _imageName = `./public/${file.originalname}`;
            done(false, file.originalname)
        }
    })

    var upload  = multer({storage: storage}).single('image');

    app.post('/get/user-info/:id', (req, res) => {
        const idFind = req.params.id;
        userDM.findUserById(idFind, (err, result) => {
            if(err) {
                console.log("Error when get info" + result);
                res.send("ERROR");
            }else{
                if(result === "NOT_REGISTER"){
                    res.send("NOT_REGISTER");
                }else{
                    result.friends       = JSON.parse(result.friends);
                    delete result.notifications;

                    res.send(result);
                };
            }
        })    
    })

    app.post(`/find/users-by-name/:name`, (req, res) => {
        const userName = req.params.name.toLowerCase();
        if(req.isAuthenticated()){
            userDM.getUserlist((err, result) => {
                console.log(`Error when search user ${err}`);

                if(err) return res.send({err: 'Error', result: null});

                var finalResult = [];
                for(var i = 0; i < result.length; i++){
                    if(result[i].name.toLowerCase().indexOf(userName) >= 0 && result[i].id !== req.user.id){
                        finalResult.push(result[i]);
                    }
                }

                return res.send({err: null, result: finalResult});
            })
        }
    })

    app.post(`/add/friend`, (req, res) => {
        const clientId = req.body.clientId;
        const friendId = req.body.friendId;

        userDM.addFriend(clientId, friendId, (err, result) => {
            userDM.addFriend(friendId, clientId, (_err, _result) => {
                return res.send({_err, _result}); 
            });
        })
    })

    function sortUserList(bundle, fn){
        var usersList = [];
        for(var i = 0; i < bundle.length; i++){
            var date1 = Date.parse(bundle[i].lastMessage.date);
            for(var j = 0; j < bundle.length; j++){
                var date2 = Date.parse(bundle[j].lastMessage.date);
                if(date1 > date2){

                    const ss  = bundle[i];
                    bundle[i] = bundle[j];
                    bundle[j] = ss;
                }

                if(j === bundle.length - 1 && i === j){
                    // console.log(bundle);
                    bundle.map((userItem, index) => {
                        userDM.findUserById(userItem.userId, (err, result) => {
                            if(!err && result !== "NOT_REGISTER"){
                                usersList.push(result);
                            }

                            if(index === bundle.length - 1){
                                fn(usersList);
                            }
                        })
                    })
                }
            }
        }
    }

    app.post('/get/users/list/:clientId', (req, res) => {
        var clientId  = req.params.clientId;
        var bundle    = [];

        userDM.getRoomsRequested(clientId, (err, rs) => {
            if(err || res === 'NOT_REGISTER') return res.send({err: "Error", result: null});

            rs.map((chatId, index) => {
                roomMD.findChatRoomById(chatId, (error, result) => {
                    if(!error){
                        const userId = result.users.filter(u => {return u !== clientId}).join('');
                        console.log(userId);
                        userDM.checkAlreadyExistsId(userId, (error2, result2) => {
                            if(!error2 && result2 !== 'NOT_REGISTER' && result.messages.length > 0){
                                bundle.push({
                                    userId: userId, 
                                    lastMessage: result.messages[result.messages.length - 1]
                                })
                            }
                            
                            if(index === rs.length - 1){
                                sortUserList(bundle, usersList => {
                                    console.log(usersList);

                                    return res.send({err: null, result: usersList});
                                });
                            }
                        })
                    }
                })
            })
        })
    })

    app.post(`/check/user/online/:userId`, (req, res) => {
        const userId = req.params.userId;
        if(onlineUsers.indexOf(userId) < 0) return res.send(false);
        return res.send(true);
    })

    app.post('/save/message', (req, res) => {
        const message  = req.body.message;
        if(message.receiveId === clientId){
            message.receiveId = message.sendId;
            message.sendId    = clientId;
        }
    })

    app.post(`/check/client/:clientId`, (req, res) => {
        const clientId = req.params.clientId;
        if(clientId !== req.user.id) return res.send(false)
        return res.send(true);
    })

    app.post(`/update/client-info`, (req, res) => {
        if(req.isAuthenticated()){
            const userId      = req.user.id;
            const infoUpdated = req.body.infoUpdated;

            userDM.updateUserInfo(userId, infoUpdated, (err, result) => {
                return res.send(result);
            })
        }
    })


    app.post('/get/client-info', (req, res) => {
        if(!req.isAuthenticated()){
            return res.send("NOT_LOGIN");
        }else{
            userDM.findUserById(req.user.id, (err, result) => {
                if(!err && result !== 'NOT_REGISTER'){
                    result.friends       = JSON.parse(result.friends);
                    result.notifications = JSON.parse(result.notifications);
                    return res.send(result)
                }
            })
        }
    })

    app.post(`/update/user/avatar`, (req, res) => {
        if(req.isAuthenticated()){
            upload(req, res, err => {
                if(err) {
                    console.log(`Error when upload pic ${err}`);
                    return res.send('Error');
                }

                imgurUploader(fs.readFileSync(_imageName), {title: 'product'}).then(data => {
                    fs.unlink(_imageName);
                    userDM.updateAvatar(req.user.id, data.link, (err, result) => {
                        if(err){
                            console.log(`Error when upload pic database ${err}`);
                            return res.send("Error");  
                        } 

                        return res.redirect('/');
                    })
                })
            })
        }
    })

    app.post(`/get/notifis/:userId`, (req, res) => {
        const userId = req.params.userId;
        userDM.getNotifications(userId, (err, result) => {
            res.send({err: result});
        })
    })

    app.post(`/rv/notifi_m`, (req, res) => {
        const userId = req.body.userId;
        const sendId = req.body.sendId;

        userDM.rvNotification(userId, sendId, (err, result) => {
            console.log(`Result rv notification ${result}`);
            if(err) console.log(err);
            res.send({err, result});
        })
    })
}