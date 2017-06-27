const $ = require('jquery');
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
        $.ajax({
            url: `/get/user-info/:${id}`, type: 'POST', 
            success: data => {
                switch(data.result){
                    case "NOT_REGISTER":
                        return fn(false, "Tai khoan khong ton tai");
                    case "ERROR":
                        return fn(true, "Co loi xay ra");
                    default:
                        return fn(false, data);
                }
            }, error: err => fn(true, "Co loi xay ra")
        })
    }

    getUserList(fn){
        $.ajax({
            url: '/get/user-list', type: 'POST', 
            success: data => {
                return fn(data.err, data.result);
            },
            error: err => fn(true, "")
        })
    }
}

export default new userMG();