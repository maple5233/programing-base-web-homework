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
  data: {
      active: {
        now: 0,
        is_create: true, // true 活动发布、 false 活动更新
        cur_id: ''
      },
      curStartTime: getCurTime(),
      curEndTime: getCurTime(),
      curName: '',
      curPlace: '',
      curPublisher: '',
      curDetail: '',
      curPublished: getCurTime(),
      curCover: '',
      startTimeVarName: 'curStartTime',
      endTimeVarName: 'curEndTime',
      publishTimeVarName: 'curPublished',
      items: [],
      pagination: {
        total: 15,
        per_page: 20,    // required
        current_page: 1, // required
        last_page: 3,    // required
        from: 1,
        to: 12           // required
      },
      paginationOptions: {
        offset: 4,
        previousText: 'Prev',
        nextText: 'Next',
        alwaysShowPrevNext: true
      },
      activities: []
  },
  filters: {
    /**
     * 格式化时间
     * @param  {String} str 要格式化的时间字符串
     * @return {String}     格式化的结果
     */
     datetime (str) {
      const date = new Date(str)
      const year = date.getFullYear()
      const day = date.getDate().toString().padStart(2, '0')
      const mouth = (date.getMonth() + 1).toString().padStart(2, '0')
      const hour = date.getHours().toString().padStart(2, '0')
      const minute = date.getMinutes().toString().padStart(2, '0')
      return `${year}-${mouth}-${day} ${hour}:${minute}`
    }
  },
  methods: {
    /**
     * 改变Tab标签
     * @param  {Number} index  选择的标签的下标
     * @param  {Object} active 本地变量，存储哪个Tab是激活的
     * @return {void}
     */
     changeTab: (index, active) => {
      active.now = index
    },
    /**
     * 删除活动
     * @param  {Number} index 要删除的活动的下标
     * @return {void}
     */
     async deleteAct (index, item) {
      if (!window.confirm('真的要删除活动："' + item.name + '"吗？')) {
        return
      }
      const result = await (await this.$http.delete('activity/' + item._id, {
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })).json()
      if (!result.success) {
        window.alert(result.message)
        return
      }
      this.activities.splice(index, 1)
    },
    /**
     * 拉取和更新数据
     */
     async loadData () {
      const result = await (await this.$http.get('activities/all/page/' + (this.pagination.current_page - 1))).json()
      this.activities = result.data
      const pageResult = await (await this.$http.get('activities')).json()
      this.pagination.last_page = Math.floor(pageResult.data / 20) + 1
    },
    /**
     * 发布和更新活动
     */
     async publishAct () {
      let para = {
        name: this.curName,
        place: this.curPlace,
        detail: this.curDetail,
        start: this.curStartTime,
        end: this.curEndTime,
        publisher: this.curPublisher,
        cover: this.curCover
      }
      if (this.active.is_create) {
        const putResult = await (await this.$http.put('activity/', para, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })).json()
        if (!putResult.success) {
          window.alert(putResult.message)
          return
        }
        window.alert('发布成功')
      } else {
        const postResult = await (await this.$http.post('activity/' + this.active.cur_id, para, {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })).json()
        if (!postResult.success) {
          window.alert(postResult.message)
          return
        }
        window.alert('更新成功')
      }
      this.loadData()
    },
    /**
     * 切换到发布活动
     */
     changeToCreat () {
      this.active.now = 1
      this.active.is_create = true
      this.active._id = ''
      this.curName = ''
      this.curPlace = ''
      this.curDetail = ''
      this.curStartTime = ''
      this.curEndTime = ''
      this.curPublisher = ''
      this.curPublishTime = ''
      this.curCover = ''
    },
    /**
     * 切换到更新活动
     * @param  {Object} item 要更新的活动的信息
     */
     changeToEdit (item) {
      this.active.now = 1
      this.active.is_create = false
      this.active.cur_id = item._id
      this.curName = item.name
      this.curPlace = item.place
      this.curDetail = item.detail
      this.curStartTime = item.start
      this.curEndTime = item.end
      this.curPublisher = item.publisher
      this.curCover = item.cover
    },
    /**
     * token验证
     */
     async confirmToken () {
      const result = await (await this.$http.post('check', undefined, {
        headers: {
          Authorization: 'Bearer ' + this.token_input
        }
      })).json()
      if (result.success) {
        this.loadData()
        this.token = this.token_input
      } else {
        window.alert('无效token')
      }
    }
  }
})