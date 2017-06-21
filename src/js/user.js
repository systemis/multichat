const $ = require('jquery');
class userMG {
    register(name, email, password, fn){
        console.log('Co nguoi dang su dung lib nay');
        $.ajax({
            url: '/sign-up', type: 'POST', 
            success: data => {

            },

            error: err => fn(true, err)
        })
    }
}

export default new userMG();