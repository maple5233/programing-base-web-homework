'use strict';

var vm = new Vue ({
    el: '#whole',
    data: {
        userClass: '',
        userName: '',
        userPass: '',
        _userPass: '' // 加密后的密码;
    },
    methods: {
        verify: function () {
            if (this.userName.length === 0 || this.userPass.length === 0) {
                window.alert ("信息不完整!")
                return false
            }
            if (this.userName.length > 10) {
                window.alert ('登录名过长！')
                return false
            } else if (this.userPass.length < 6) {
                window.alert ('密码过短！')
                return false
            }
            this._userPass = hex_sha1 (this.userPass)
            return true
        },
        login: function () {
            if (!this.verify ()) {
                // console.log(1)
                return
            }
            this.$http.post ('/login', {
                userName: this.userName,
                userPass: this._userPass,
            }).then (function (result) {
                let res = result.data
                if (res.code == '0') {
                    window.alert ('登录成功')
                    window.location.href = '/user/' + res.user.authorId
                        + '/' + res.user.userClass
                    // +'/'+res.user.roleId
                        + '/' + JSON.stringify(res.statistics)
                } else {
                    window.alert (res.message)
                    window.location.href = '/'
                }
            }, function (result) {
                window.alert (result)
            })
        },
        register: function () {
            if (!this.verify ()) {
                return
            }
            if (this.userClass.length === 0) {
                window.alert ('信息不完整!')
                return
            }
            this.$http.post ('/register', {
                registerName: this.userName,
                registerPass: this._userPass,
                registerClass: this.userClass
            }).then (function (result) {
                let res = result.data
                if (res.code == '0') {
                    alert ('注册成功')
                    window.location.href = '/user/1'
                } else if (res.code == '1001A') {
                    alert ('用户名已经存在')
                    window.location.href = '/'
                } else if (res.code == '-1') {
                    alert ('未知错误')
                    window.location.href = '/'
                }
            }, function (result) {
                window.alert (result)
                return
            })
        }
    }
})