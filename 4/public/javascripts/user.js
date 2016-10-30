var vm = new Vue({
  el: '#whole',
  data: {
      active: {
        now: 4
      },
      rank: 5, // 用户权限
      classId : '1',
      authorId : '2014150120',
      postTexts: [],
      newPost: {
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
  },
  filters: {
    /**
     * 格式化时间
     * @param  {String} str 要格式化的时间字符串
     * @return {String}     格式化的结果
     */
     datetime (str) {
      let date = new Date(str)
      let year = date.getFullYear()
      let day = date.getDate().toString()
      if (day.length === 1) {
        day = '0'+ day
      }
      let mouth = (date.getMonth() + 1).toString()
      if (mouth.length === 1) {
        mouth = '0'+ mouth
      }
      let hour = date.getHours().toString()
      if (hour.length === 1) {
        hour = '0'+ hour
      }
      let minute = date.getMinutes().toString()
      if (minute.length === 1) {
        minute = '0'+ minute
      }
      return `${year}-${mouth}-${day} ${hour}:${minute}`
    },
    date (str) {
      let date = new Date(str)
      let year = date.getFullYear()
      let day = date.getDate().toString()
      if (day.length === 1) {
        day = '0'+ day
      }
      let mouth = (date.getMonth() + 1).toString()
      if (mouth.length === 1) {
        mouth = '0'+ mouth
      }
      let hour = date.getHours().toString()
      if (hour.length === 1) {
        hour = '0'+ hour
      }
      let minute = date.getMinutes().toString()
      if (minute.length === 1) {
        minute = '0'+ minute
      }
      return `${year}-${mouth}-${day}`
    },
    members (arr) {
      return arr.join('\n')
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
      this.emptyPost()
      /** ajax更新视图 */
    },
    addPost: function () {
      return
       let newPost = {
        classId: '1',
        className: '软工2班',
        stuId: '2014150121',
        authorId: '2014150120',
        date: (new Date()).toString(),
        gotten: 1,
        num: 2,
        bond: 2000,
        howmuch: 2000,
        payedMembers: ['2014150120','2014150121'],
        unpayedMembers: ['2014150122','2014150123'],
        place: '深大文科楼',
        pAgree: ['2014150120','2014150121'],
        pDisagree: ['2014150122','2014150123'],
        title: '关于优秀学生',
        contant: '我有一个不成熟的小建议'
      }
      this.postTexts.push(newPost)
    },
    emptyPost : function () {
      // 重置表单
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
    submitPost: function (index) {
      let datePattern = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
      try {
        /* 字符串处理为数组 */
        this.newPost.payedMembers = JSON.parse('[' + this.newPost.payedMembers + ']')
        this.newPost.unpayedMembers = JSON.parse('[' + this.newPost.unpayedMembers + ']')
        this.newPost.pAgree = JSON.parse('[' + this.newPost.pAgree + ']')
        this.newPost.pDisagree = JSON.parse('[' + this.newPost.pDisagree + ']')
        /* 时间转化为时间对象再转字符串 */
        if (this.newPost.date !== null && !this.newPost.date.match(datePattern)) {
          window.alert('时间格式: 年-月-日')
          return
        }
        this.newPost.date = new Date(this.newPost.date).toString()
        /* 补全信息 */
        this.newPost.authorId = this.authorId
        this.newPost.classId = this.classId
      } catch(e) {
        widows.alert('数据格式不正确!')
        console.log(e)
        return
      }
      let post = this.newPost
      switch (index) {
        case 0:
          if (post.stuId == null || post.className == null || post.date == null) {
            window.alert('信息不全')
            this.emptyPost()
            return
          }
          break;
        case 1:
          if (post.stuId == null || post.title == null || post.bond == null) {
            window.alert('信息不全')
            this.emptyPost()
            return
          }
          break;
        case 2:
          if (post.howmuch == null || post.payedMembers == null || post.unpayedMembers == null) {
            window.alert('信息不全')
            this.emptyPost()
            return
          }
          break;
        case 3:
          if (post.date == null || post.place == null || post.num == null || post.gotten == null 
            || post.title == null || post.pAgree == null || post.pDisagree == null) {
            window.alert('信息不全')
            this.emptyPost()
            return
          }
          break;
        case 4:
          if (post.title == null || post.contant == null || post.date == null) {
            window.alert('信息不全')
            this.emptyPost()
            return
          }
          break;
        default:
          break;
      }
      this.postTexts.push(this.newPost)
      this.emptyPost()
    }
  },
  mounted () {
    this.changeTab(4,this.active)
  }
})