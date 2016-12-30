<template>
    <div id="app">
        <header-menu></header-menu>
        <div class="container">
            <!-- <router-view></router-view> -->
            <order></order>
        </div>
        <footer-info></footer-info>
    </div>
</template>

<script>
    import headerMenu from './components/headerMenu.vue'
    import footerInfo from './components/footerInfo.vue'
    import order from './components/orderHistory.vue'

    export default {
      data () {
        return {

        }
    },
    components: {
        headerMenu,
        footerInfo,
        order
    },
    methods: {
    }
}
</script>

<style lang="less">
    @import './assets/styles/definition.less';
    @import './assets/styles/normalize.less';

    .container {
        margin: 0 auto;
        padding: 2rem;
        min-height: 60vh;
    }
</style>
