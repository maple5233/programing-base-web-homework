'use strict';

var vm = new Vue ({
    el: '#whole',
    data: {
        userName : '',
        userPass : ''
    },
    methods: {
        verify : function () {
            if (this.userName.length === 0 || this.userPass.length === 0) {
                window.alert("信息不完整!")
                return false
            }
            return true
        },
        login : function () {
            if (this.verify()) {
                console.log('用户请求登录')
            }
        },
        register : function () {
            if (this.verify()) {
                console.log('用户请求注册')
            }
        }
    }
})