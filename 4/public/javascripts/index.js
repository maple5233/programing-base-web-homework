import { hex_sha1 } from "./libs/sha1";
'use strict';

var vm = new Vue ({
    el: '#whole',
    data: {
        userClass : '',
        userName : '',
        userPass : '',
        _userPass : '' // 加密后的密码;
    },
    methods: {
        verify : function () {
            if (this.userName.length === 0 || this.userPass.length === 0) {
                window.alert("信息不完整!")
                return false
            }
            if (this.userName.length > 10) {
                window.alert ('登录名过长！')
                return false
            } else if (this.userPass.length < 6) {
                window.alert ('密码过短！')
                return false
            }
            this._userPass = hex_sha1(this.userPass)
            return true
        },
        login : function () {
            if (this.verify()) {
                console.log('用户请求登录')
            }
        },
        register : function () {
            if (!this.verify()) {
                return
            }
            if (this.userClass.length === 0) {
                window.alert('信息不完整!')
                return
            }
            this.$http.post ('/register', {
                registerName: this.userName,
                registerPass: this._userPass,
                registerClass: this.userClass
            }).then (function (result) {
                let res = result.data
            })
        }
    }
})