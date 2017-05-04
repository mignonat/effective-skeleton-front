<template>
    <div id="app">
        <top-bar></top-bar>
        <left-menu></left-menu>
        <router-view class="content"></router-view>
    </div>
</template>

<script>
    import TopBar from './layouts/pc/TopBar.vue'
    import LeftMenu from './layouts/pc/LeftMenu.vue'

    export default {
        computed : {}, // use when complexe check has to be done in the template
        methods : {},  // here no dom manipulation
        components : { TopBar, LeftMenu }
    }
</script>