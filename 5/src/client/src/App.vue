<template>
    <div id="app">
        <header-menu></header-menu>
        <footer-info></footer-info>
    </div>
</template>

<script>
    import headerMenu from './components/headerMenu.vue'
    import footerInfo from './components/footerInfo.vue'

    export default {
      data () {
        return {

        }
    },
    components: {
        headerMenu,
        footerInfo
    },
    methods: {
    }
}
</script>

<style lang="less">
    @import './assets/styles/definition.less';
    @import './assets/styles/normalize.less';
</style>
