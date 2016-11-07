/**
 * manager.js
 * Created by hongjiyao_2014150120 on 16-11-1.
 */
'use strict';

var vm = new Vue ({
    el: '#whole',
    data: {
        userPass: '',
        _userPass: '', // 加密后的密码;
        hasAuth: false, // 是否已经验证
        students: []
    },
    methods: {
        getStudents: function () {
            this.$http.get ('/manager/students').then (function (result) {
                let res = result.data
                if (res.code == '0') {
                    this.students = res.students
                } else {
                    window.alert ('未知错误!')
                }
            }, function (result) {
                window.alert (result.toString ())
            })
        },
        verify: function () {
            if (this.userPass.length === 0) {
                window.alert ("信息不完整!")
                return false
            }
            this._userPass = hex_sha1 (this.userPass)
            return true
        },
        login: function () {
            if (!this.verify ()) {
                return
            }
            this.$http.post ('/manager', {
                pass: this._userPass
            }).then (function (result) {
                let res = result.data
                if (res.code == '0') {
                    this.hasAuth = true
                    this.getStudents ()
                } else {
                    window.alert ('密码错误!')
                }
            }, function (result) {
                window.alert (result.toString ())
            })
        },
        changeRank: function (index, rank) {
            this.$http.put ('/manager/update', {
                stuId: this.students[ index ].stuId,
                rank: rank
            }).then (function (result) {
                let res = result.data
                if (res.code == '0') {
                    this.students[ index ].rank = rank
                } 
            }, function (result) {
                window.alert (result.toString ())
            })
        }
    },
    mounted() {

    }
})