<template>
  <v-app dark>
    <main-navigation-drawer />

    <!-- App Bar -->
    <v-app-bar color="accent" clipped fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MainNavigationDrawer from '@/components/layout/NavigationDrawer/MainNavigationDrawer.vue'

export default {
  components: {
    MainNavigationDrawer
  },
  data: () => ({ title: 'Chega.ai' }),
  mounted () {
    if (!this.$auth.user.email) {
      this.$services.auth.getMe().then((me) => {
        this.$auth.setUser({
          ...this.$auth.user,
          ...me
        })
      })
    }
  },
  methods: {
    logout () {
      this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
