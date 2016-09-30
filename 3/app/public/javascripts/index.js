'use strict';

var vm = new Vue ({
    el: '#wholePage',
    data: {
        textNumLimit: 140,
        userId: '',
        comment: '',
        msgs: [],
        editing: false
    },
    ready() {
        /* get msgs in LocalStorage*/
        if (localStorage.getItem ('messages')) {
            console.log ('Load localStorage successfully!');
            var msgLoad = localStorage.getItem ('messages');
            var msgObj = JSON.parse (msgLoad);
            // console.dir(msgObj);
            this.msgs = msgObj;
        }
        /* pullMsg */
        this.pullMsg ();
    },
    methods: {
        sendMsg: function () {
            if (this.userId.length*this.comment.length === 0) {
                window.alert('Lost Info!');
                return;
            }
            this.$http.post ('/comment', {
                commentNew: {
                    userId: this.userId,
                    comment: this.comment.replace(/\n/g,'<br />')
                }
            }).then (result => {
                if (result.data.code === '0') {
                    this.userId = '';
                    this.comment = '';
                    this.textNumLimit = 140;
                    window.alert ('发送成功!');
                    // console.log ('send successfully!');
                } else {
                    console.log (result.data.code);
                }
            });
        },
        pullMsg: function () {
            var pullMsgId = setInterval (()=> {
                this.$http.get ('/comment').then (result => {
                    if (result.data.code === '0') {
                        /* update view model */
                        var newMsgs = result.data.msgs;
                        var newLength = newMsgs.length;
                        var addLength = newLength - this.msgs.length;
                        for (var i = addLength - 1; i >= 0; i--) {
                            newMsgs[ i ].textNumLimit = 140 - newMsgs[ i ].comment.length;
                            newMsgs[ i ].editing = false; // 新增加两个只存在于前端的属性
                            this.msgs.unshift (newMsgs[ i ]);
                        }
                        /* update LocalStorage*/
                        var len = this.msgs.length > 20 ? 20 : this.msgs.length;
                        var latestMsgs = this.msgs.slice (-len); // 深拷贝最旧的20条;
                        latestMsgs=[];
                        localStorage.setItem ('messages', JSON.stringify (latestMsgs));// 更新
                    } else {
                        console.log (result.data.code);
                    }
                });
            }, 1000);
        },
        inputComment: function () {
            var len = this.comment.length;
            this.textNumLimit = 140 - len;
        },
        inputUpDateComment: function (index) {
            var len = this.msgs[ index ].comment.length;
            this.msgs[ index ].textNumLimit = 140 - len;
        },
        checkComment: function () {
            if (event.ctrlKey && event.keyCode == 86) { //禁止粘贴
                event.returnValue = false;
            }
            var len = this.comment.length;
            if (len >= 140 && event.keyCode !== 8 && (!event.ctrlKey || !event.keyCode == 65)) { //仅允许删除和全选
                event.returnValue = false;
            }
        },
        checkUpDateComment: function (index) {
            if (event.ctrlKey && event.keyCode == 86) { //禁止粘贴
                event.returnValue = false;
            }
            var len = this.msgs[ index ].comment.length;
            if (len >= 140 && event.keyCode !== 8 && (!event.ctrlKey || !event.keyCode == 65)) { //仅允许删除和全选
                event.returnValue = false;
            }
        },
        editComment: function (index) {
            if (this.editing === true) { //正在编辑其他的
                window.alert ('您有其他编辑未保存!');
                return;
            } else {
                this.msgs[ index ].editing = true;
                this.editing = true;
                this.msgs[ index ].comment = this.msgs[ index ].comment.replace(/<br\s*\/?>/g,'\n');
            }
        },
        updateMsg: function (index) {
            this.editing = false;
            this.msgs[ index ].editing = false;
            this.msgs[ index ].comment = this.msgs[ index ].comment.replace(/\n/g,'<br />');
            /* 立即上传 */
            this.$http.put ('/comment', {
                commentNew: {
                    _id: this.msgs[ index ]._id,
                    comment: this.msgs[ index ].comment.replace(/\n/g,'<br />')
                }
            }).then (result => {
                if (result.data.code === '0') {
                    this.msgs[ index ].updateDate = result.data.updateDate;
                    window.alert ('更新成功!');
                    // console.log ('update successfully!');
                    /* update LocalStorage*/
                    var len = this.msgs.length > 20 ? 20 : this.msgs.length;
                    var latestMsgs = this.msgs.slice (-len); // 深拷贝最旧的20条;
                    // latestMsgs=[];
                    localStorage.setItem ('messages', JSON.stringify (latestMsgs));// 更新
                } else {
                    console.log (result.data.code);
                }
            });
        }
    }
})