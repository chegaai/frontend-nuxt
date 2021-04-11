<template>
  <v-navigation-drawer
    color="primary"
    dark
    permanent
    :mini-variant.sync="isMini"
    fixed
    app
  >
    <template v-slot:prepend>
      <profile-drawer-header :is-mini="isMini" @toggleMini="isMini = !isMini" />
    </template>
    <v-divider />
    <navigation-drawer-items :items="items" />
  </v-navigation-drawer>
</template>

<script>
import ProfileDrawerHeader from './ProfileDrawerHeader.vue'
import NavigationDrawerItems from './/NavigationDrawerItems.vue'

export default {
  name: 'MainNavigationDrawer',
  components: { ProfileDrawerHeader, NavigationDrawerItems },
  data: () => ({
    isMini: true,
    items: [
      {
        to: '/',
        icon: 'mdi-home',
        title: 'Home'
      },
      {
        to: '/groups',
        icon: 'mdi-account-group',
        title: 'Grupos'
      }
    ]
  })
}
</script>
