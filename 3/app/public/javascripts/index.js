'use strict';

var vm = new Vue ({
    el: '#wholePage',
    data: {
        textNumLimit: 140,
        userId: '',
        comment: '',
        msgs: []
    },
    ready() {
        /* get msgs in LocalStorage*/
        if (localStorage.getItem ('messages')) {
            console.log('Load localStorage successfully!');
            var msgLoad =localStorage.getItem ('messages');
            var msgObj = JSON.parse(msgLoad);
            // console.dir(msgObj);
            this.msgs = msgObj;
        }
        /* pullMsg */
        this.pullMsg ();
    },
    methods: {
        sendMsg: function () {
            this.$http.post ('/comment', {
                comment: {
                    userId: this.userId,
                    comment: this.comment
                }
            }).then (result => {
                if (result.data.code === '0') {
                    this.userId = '';
                    this.comment = '';
                    this.textNumLimit = 140;
                    window.alert ('发送成功!');
                    console.log ('send successfully!');
                } else {
                    console.log (result.data.code);
                }
            });
        },
        pullMsg: function () {
            // console.log('pulling msgs...');
            var pullMsgId = setInterval (()=> {
                this.$http.get ('/comment').then (result => {
                    if (result.data.code === '0') {
                        /* update view model */
                        var newMsgs = result.data.msgs;
                        var newLength = newMsgs.length;
                        var addLength = newLength - this.msgs.length;
                        for (var i = addLength - 1; i >= 0; i--) {
                            // console.log (newMsgs[ i ]);
                            this.msgs.unshift (newMsgs[ i ]);
                        }
                        /* update LocalStorage*/
                        var len = this.msgs.length > 5 ? 5 : this.msgs.length;
                        var latestMsgs = this.msgs.slice(-5); // 深拷贝最旧的5条;
                        // latestMsgs=[];
                        // console.log(latestMsgs);
                        localStorage.setItem ('messages', JSON.stringify(latestMsgs));// 更新
                    } else {
                        console.log (result.data.code);
                    }
                });
            }, 3000);
        },
        inputComment: function () {
            var len = this.comment.length;
            this.textNumLimit = 140 - len;
        },
        checkComment: function () {
            if (event.ctrlKey && event.keyCode == 86) { //禁止粘贴
                event.returnValue = false;
            }
            var len = this.comment.length;
            if (len >= 140 && event.keyCode !== 8 && (!event.ctrlKey || !event.keyCode == 65)) {
                event.returnValue = false;
            }
        }
    }
})