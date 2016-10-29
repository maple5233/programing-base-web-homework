/**
  * 获取当前时间字符串
  */
function getCurTime () {
  let time = new Date()
  let year = time.getFullYear()
  let mon = time.getMonth() + 1
  let date = time.getDate()
  let hour = time.getHours()
  let min = time.getMinutes()
  let ret = [year, mon, date].join('-') + ' ' + [hour, min].join(':')
  return ret
}

var vm = new Vue({
  el: '#whole',
  data: {
      active: {
        now: 0
      },
      postTexts: []
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
    }
  },
  mounted () {
  }
})