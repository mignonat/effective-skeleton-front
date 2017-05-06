<template>
    <ul class="left_menu">
        <li><router-link to="/home" active-class="active">   {{ translate("menu.home") }}   </router-link></li>
        <li><router-link to="/contact" active-class="active">{{ translate("menu.contact") }}</router-link></li>
        <li><router-link to="/admin/user" active-class="active">{{ translate("menu.admin.user") }}</router-link></li>
    </ul>
</template>

<script>
    export default {
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            }
        }
    }
</script>

    