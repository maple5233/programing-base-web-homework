var vm = new Vue ({
    el: '#whole',
    data: {
        bgImg: '/images/bgc5.png',
        active: {
            now: 4
        },
        rank: 5, // 用户权限
        classId: '1',
        authorId: '2014150120',
        postTexts: [],
        newPost: {
            classId: null,    // ajax请求得到发帖人的班级 String
            className: null,  // 班级的某一门课的名字 String
            stuId: null,      // 某个学生的Id String 后端Number
            authorId: null,   // 发帖人的学生Id 后端Number
            date: null,       // 日期或者ddl Date 后端Date
            gotten: null,     // 实际到的人数 Number 后端Number
            num: null,        // 参加的总人数 Number 后端Number
            bond: null,       // 奖金 Number 后端Number
            howmuch: null,    // 班费 Number 后端Number
            payedMembers: null,  // 已经交付的人 [String] 后端[Number]
            unpayedMembers: null, // 还没交付的人 [String] 后端[Number]
            place: null,          // 地点 String
            pAgree: null,         // 同意的人 [String] 后端[Number]
            pDisagree: null,      // 不同意的人 [String] 后端[Number]
            title: null,        // 主题或者奖项名称或者回复主题 String
            contant: null       // 回复内容 String
        },
        thisAuthor: {
            howMuch: 1000,// 已经交了多少班费
            howMuchRemain: 200, // 还差多少要交
            numOfDayNotSign: 2, // 旷课总数
            dayNotSign: [new Date(),new Date()] // 旷课情况
        }
    },
    filters: {
        /**
         * 格式化时间
         * @param  {String} str 要格式化的时间字符串
         * @return {String}     格式化的结果
         */
        datetime (str) {
            let date = new Date (str)
            let year = date.getFullYear ()
            let day = date.getDate ().toString ()
            if (day.length === 1) {
                day = '0' + day
            }
            let mouth = (date.getMonth () + 1).toString ()
            if (mouth.length === 1) {
                mouth = '0' + mouth
            }
            let hour = date.getHours ().toString ()
            if (hour.length === 1) {
                hour = '0' + hour
            }
            let minute = date.getMinutes ().toString ()
            if (minute.length === 1) {
                minute = '0' + minute
            }
            return `${year}-${mouth}-${day} ${hour}:${minute}`
        },
        date (str) {
            let date = new Date (str)
            let year = date.getFullYear ()
            let day = date.getDate ().toString ()
            if (day.length === 1) {
                day = '0' + day
            }
            let mouth = (date.getMonth () + 1).toString ()
            if (mouth.length === 1) {
                mouth = '0' + mouth
            }
            return `${year}-${mouth}-${day}`
        },
        dates (datesArr) {
            let str = ''
            datesArr.forEach((date)=>{
                let year = date.getFullYear ()
                let day = date.getDate ().toString ()
                if (day.length === 1) {
                    day = '0' + day
                }
                let mouth = (date.getMonth () + 1).toString ()
                if (mouth.length === 1) {
                    mouth = '0' + mouth
                }
                let hour = date.getHours ().toString ()
                if (hour.length === 1) {
                    hour = '0' + hour
                }
                str += `${year}-${mouth}-${day}` + ',' + '\n'
            })
            return str.substr(0,str.length-2)
        },
        /**
         * 数组转化为字符串并添加换行符号
         * @param  {Array} arr 要转化的学生ID数组
         * @return {String}     能显示的字符串
         */
        members (arr) {
            return arr.join ('\n')
        }
    },
    methods: {
        /**
         * 改变Tab标签
         * @param  {Number} index  选择的标签的下标
         * @param  {Object} active 本地变量，存储哪个Tab是激活的
         */
        changeTab: function (index, active) {
            active.now = index
            this.postTexts = []
            this.emptyPost ()
            /** ajax更新视图 */
        },
        /**
         * 测试添加活动用的
         */
        addPost: function () {
            return
            let newPost = {
                classId: '1',
                className: '软工2班',
                stuId: '2014150121',
                authorId: '2014150120',
                date: (new Date ()).toString (),
                gotten: 1,
                num: 2,
                bond: 2000,
                howmuch: 2000,
                payedMembers: [ '2014150120', '2014150121' ],
                unpayedMembers: [ '2014150122', '2014150123' ],
                place: '深大文科楼',
                pAgree: [ '2014150120', '2014150121' ],
                pDisagree: [ '2014150122', '2014150123' ],
                title: '关于优秀学生',
                contant: '我有一个不成熟的小建议'
            }
            this.postTexts.push (newPost)
        },
        /**
         * 清空表单内容
         * 填充作者的ID和作者班级的ID
         */
        emptyPost: function () {
            this.newPost = {
                classId: null,
                className: null,
                stuId: null,
                authorId: null,
                date: null,
                gotten: null,
                num: null,
                bond: null,
                howmuch: null,
                payedMembers: null,
                unpayedMembers: null,
                place: null,
                pAgree: null,
                pDisagree: null,
                title: null,
                contant: null
            }
            this.newPost.authorId = this.authorId
            this.newPost.classId = this.classId
        },
        /**
         * 提交发帖 更新视图 请求后台
         * @param  {Number} index 是哪一种帖子
         */
        submitPost: function (index) {

            let datePattern =
                /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/
            try {
                /* 字符串处理为数组 */
                this.newPost.payedMembers = JSON.parse ('[' + this.newPost.payedMembers + ']')
                this.newPost.unpayedMembers = JSON.parse ('[' + this.newPost.unpayedMembers + ']')
                this.newPost.pAgree = JSON.parse ('[' + this.newPost.pAgree + ']')
                this.newPost.pDisagree = JSON.parse ('[' + this.newPost.pDisagree + ']')
                /* 时间转化为时间对象再转字符串 */
                if (this.newPost.date !== null && !this.newPost.date.match (datePattern)) {
                    this.emptyPost ()
                    window.alert ('时间格式: 年-月-日')
                    return
                }
                this.newPost.date = new Date (this.newPost.date).toString ()
                /* 补全信息 */
                this.newPost.authorId = this.authorId
                this.newPost.classId = this.classId
            } catch (e) {
                widows.alert ('数据格式不正确!')
                console.log (e)
                return
            }

            let post = this.newPost

            switch (index) {
                case 0:
                    if (post.stuId == null || post.className == null || post.date == null) {
                        window.alert ('信息不全')
                        this.emptyPost ()
                        return
                    }
                    break;
                case 1:
                    if (post.stuId == null || post.title == null || post.bond == null) {
                        window.alert ('信息不全')
                        this.emptyPost ()
                        return
                    }
                    break;
                case 2:
                    if (post.howmuch == null || post.payedMembers == null || post.unpayedMembers == null) {
                        window.alert ('信息不全')
                        this.emptyPost ()
                        return
                    }
                    break;
                case 3:
                    if (post.date == null || post.place == null || post.num == null || post.gotten == null
                        || post.title == null || post.pAgree == null || post.pDisagree == null) {
                        window.alert ('信息不全')
                        this.emptyPost ()
                        return
                    }
                    break;
                case 4:
                    if (post.title == null || post.contant == null || post.date == null) {
                        window.alert ('信息不全')
                        this.emptyPost ()
                        return
                    }
                    break;
                default:
                    break;
            }

            this.postTexts.push (this.newPost)
            this.emptyPost ()
        }
    },
    mounted () {
        this.changeTab (4, this.active)
    }
})