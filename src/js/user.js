import $                    from 'jquery';
import socketMG             from './socket.js';

class userMG {
    register(name, email, password, fn){
        $.ajax({
            url: '/sign-up', type: 'POST', data: {name: name, email: email, password: password},
            success: data => {
                fn(data.err, data.message);
            },

            error: err => fn(true, err)
        })
    }


    searchUser(key, fn){
        $.ajax({
            url: `/find/users-by-name/${key}`, type: `POST`,
            success: data => {
                return fn(data.err, data.result);
            },
            error: err => fn(err, null)
        })
    }

    getClientInfo(fn){
        $.ajax({
            url: `/get/client-info`, type: `POST`,
            success: data => {
                switch(data){
                    case `NOT_LOGIN`:
                        return fn(true, "Chua dang nhap");
                    case `ERROR`: 
                        return fn(true, "Co loi xay ra");
                    default :
                        return fn(false, data);
                }
            }, error: err => fn(true, "Co loi xay ra")
        })
    }

    getUserInfo(id, fn){
        if(!id) return fn('ID underfine!', null);
        $.ajax({
            url: `/get/user-info/${id}`, type: 'POST', 
            success: data => {
                switch(data.result){
                    case "NOT_REGISTER":
                        return fn("Tai khoan khong ton tai", null);
                    case "ERROR":
                        return fn("Co loi xay ra", null);
                    default:
                        return fn(null, data);
                }
            }, error: err => fn(true, "Co loi xay ra")
        })
    }

    getUserLists(clientId, fn){
        // if(!clientId) {
        //     console.log('check is auth');
        //     return fn(null, "");   
        // }

        $.ajax({
            url: `/get/users/list/${clientId}`, type: `POST`,
            success: data => {
                fn(data.err, data.result);
            },
            error: err => fn(null, [])
        })
    }

    addFriend(clientId, friendId){
        $.ajax({
            url: `/add/friend`, type: `POST`, data: {clientId, friendId},
            success: data => {return;},
            error: err => console.log(`Add friend fault `)
        })
    }

    checkIsClient(clientId, fn){
        $.ajax({
            url: `/check/client/${clientId}`, type: `POST`,
            success: isClient => {
                fn(isClient)
            },
            error: err => fn(false)
        })
    }

    checkUserOnline(userId, fn){
        $.ajax({
            url: `/check/user/online/${userId}`, type: `POST`,
            success: isOnline => {
                fn(isOnline);
            },
            error: err => fn(false)
        })
    }

    updateClientInfo(infoUpdated, fn){
        $.ajax({
            url: `/update/client-info`, type: `POST`, data: {infoUpdated: infoUpdated},
            success: data => {
                fn(data)
            },
            error: err => fn("Error")
        })
    }

    getNotifis(userId, fn){
        $.ajax({
            url: `/get/notifis/${userId}`, type: `POST`,
            success: data => fn({err: data.err, result: data.result}),
            error: err => fn({err: err, result: null})
        })
    }

    rvNotifi_M(userId, sendId){
        $.ajax({
            url: `/rv/notifi_m`, type: `POST`, data: {userId, sendId},
            success: data => {return;},
            error:   err  => console.log(err)
        })
    }

    disConnect(userId){
        $.ajax({
            url: `/logout`, type: `GET`, 
            success: data => {
                socketMG.disConnect();

                window.location.href = '/sign-in';
            }
        })
    }
}

export default new userMG();