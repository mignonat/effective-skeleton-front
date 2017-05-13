<template>
    <ul class="left_menu">
        <li><router-link to="/home" active-class="active"><i class="material-icons">home</i><span>{{ label_home }}</span></router-link></li>
        <li><router-link to="/contact" active-class="active"><i class="material-icons">contact_mail</i><span>{{ label_contact }}</span></router-link></li>
        <li><router-link to="/admin/user" active-class="active"><i class="material-icons">account_circle</i><span>{{ label_admin_user }}</span></router-link></li>
    </ul>
</template>

<script>
    import event from '../../../utils/event.js'

    export default {
        data : function() { 
            return {
                label_home : this.translate("menu.home"),
                label_contact : this.translate("menu.contact"),
                label_admin_user : this.translate("menu.admin.user")
            }
        },
        methods : {
            translate (key, params) {
                return this.$store.getters.translate(key, params)
            },
            setTranslation() {
                this.label_home = this.translate("menu.home")
                this.label_contact = this.translate("menu.contact")
                this.label_admin_user = this.translate("menu.admin.user")
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                event.on(event.LOCALE_CHANGE, () => {
                    this.setTranslation()
                })
            })
        }
    }
</script>

    