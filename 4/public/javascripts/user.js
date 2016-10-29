var vm = new Vue({
  el: '#whole',
  data: {
      active: {
        now: 0
      },
      rank: 3, // 用户权限
      classId : '1',
      authorId : '2014150120',
      postTexts: [],
      newPost: {
        classId: null,
        className: null,
        stuId: null,
        authorId: null,
        date: null,
        deadline: null,
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
        mouth = '0'+ day
      }
      let hour = date.getHours().toString()
      if (hour.length === 1) {
        hour = '0'+ day
      }
      let minute = date.getMinutes().toString()
      if (minute.length === 1) {
        minute = '0'+ day
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
        mouth = '0'+ day
      }
      let hour = date.getHours().toString()
      if (hour.length === 1) {
        hour = '0'+ day
      }
      let minute = date.getMinutes().toString()
      if (minute.length === 1) {
        minute = '0'+ day
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
      this.newPost = {
        classId: null,
        className: null,
        stuId: null,
        authorId: null,
        date: null,
        deadline: null,
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
      /** ajax更新视图 */
    },
    addPost: function () {
       let newPost = {
        classId: '1',
        className: '软工2班',
        stuId: '2014150121',
        authorId: '2014150120',
        date: (new Date()).toString(),
        deadline: (new Date()).toString(),
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
    submitPost: function (index) {
      try {
        /* 字符串处理为数组 */
        this.newPost.payedMembers = JSON.parse('[' + this.newPost.payedMembers + ']')
        this.newPost.unpayedMembers = JSON.parse('[' + this.newPost.unpayedMembers + ']')
        this.newPost.pAgree = JSON.parse('[' + this.newPost.pAgree + ']')
        this.newPost.pDisagree = JSON.parse('[' + this.newPost.pDisagree + ']')
        /* 时间转化为时间对象 */
        this.newPost.date = new Date(this.newPost.date)
        this.newPost.deadline = new Date(this.newPost.deadline)
        /* 补全信息 */
        this.newPost.authorId = this.authorId
        this.newPost.classId = this.classId
      } catch(e) {
        widows.alert('数据格式不正确!')
        console.log(e)
        return
      }
      console.log(this.newPost)
      switch (index) {
        case 0:
          // ajax
          break;
        default:
          break;
      }
      this.postTexts.push(this.newPost)
      // 重置表单
      this.newPost = {
        classId: null,
        className: null,
        stuId: null,
        authorId: null,
        date: null,
        deadline: null,
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
    }
  },
  mounted () {
  }
})