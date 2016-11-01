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
        students: [ {
            stuId: 2014150120,
            rank: 4
        }, {
            stuId: 2014150121,
            rank: 3
        }, {
            stuId: 2014150122,
            rank: 2
        }, {
            stuId: 2014150123,
            rank: 1
        }, {
            stuId: 2014150121,
            rank: 0
        }, {
            stuId: 2014150121,
            rank: 4
        }, {
            stuId: 2014150121,
            rank: 3
        }, {
            stuId: 2014150121,
            rank: 2
        }, {
            stuId: 2014150121,
            rank: 3
        }, {
            stuId: 2014150122,
            rank: 2
        }, {
            stuId: 2014150123,
            rank: 1
        }, {
            stuId: 2014150121,
            rank: 0
        }, {
            stuId: 2014150121,
            rank: 4
        }, {
            stuId: 2014150121,
            rank: 3
        }, {
            stuId: 2014150121,
            rank: 2
        } ]
    },
    methods: {
        verify: function () {
            if (this.userPass.length === 0) {
                window.alert ("信息不完整!")
                return false
            }
            this._userPass = hex_sha1 (this.userPass)
            return true
        },
        login: function () {
            if (this.verify ()) {
                this.hasAuth = true
            }
        },
        changeRank: function (index, rank) {
            this.students[index].rank = rank
        }
    }
})