<template>
    <select class="select_locale" value="getLocale()" v-on:change="setLocale($event.target.value)">
        <option value="fr" :selected="getLocale() === 'fr'">Français</option>
        <option value="en" :selected="getLocale() === 'en'">English</option>
    </select>
</template>

<script>
    import locale from '../../utils/locale.js'
    export default {
        methods : locale
    }
</script>