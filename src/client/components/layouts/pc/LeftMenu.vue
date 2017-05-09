<template>
    <ul class="left_menu">
        <li><router-link to="/home" active-class="active"><i class="material-icons">home</i><span>{{ translate("menu.home") }}</span></router-link></li>
        <li><router-link to="/contact" active-class="active"><i class="material-icons">contact_mail</i><span>{{ translate("menu.contact") }}</span></router-link></li>
        <li><router-link to="/admin/user" active-class="active"><i class="material-icons">account_circle</i><span>{{ translate("menu.admin.user") }}</span></router-link></li>
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

    