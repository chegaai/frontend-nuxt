<template>
  <v-app dark>
    <v-app-bar fixed app>
      <router-link to="/" style="text-decoration: none; color: inherit;" class="font-weight-bold">
        <v-toolbar-title v-text="title" />
      </router-link>
      <v-spacer />
      <v-btn v-if="!loggedIn" to="/login" text>
        Login
      </v-btn>
      <v-menu v-if="loggedIn" open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar right size="40" v-bind="attrs" v-on="on">
            <v-img alt="Profile picture" :src="userData.picture" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            {{ fullName }}
          </v-list-item>
          <v-divider />
          <v-list-item v-for="(item, i) in menuItems" :key="i" v-bind="item.attrs" v-on="item.on">
            <v-list-item-avatar>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import { VList } from 'vuetify/lib'
import { mapState, mapGetters } from 'vuex'

import ls from '~/utils/local-storage'

export default {
  name: 'Default',
  components: { VList },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'chega.ai',
      menuItems: [
        {
          icon: 'account_box',
          title: 'Perfil',
          attrs: { to: '/profile' }
        },
        {
          icon: 'exit_to_app',
          title: 'Logout',
          on: { click: this.logout }
        }
      ]
    }
  },
  computed: {
    ...mapState('auth', ['loggedIn', 'token', 'userData']),
    ...mapGetters('auth', ['fullName'])
  },
  mounted() {
    const userData = ls.getItem('userData')
    const token = ls.getItem('token')

    if (!token || !userData) {
      return
    }

    this.$store.commit('auth/setToken', token)
    this.$store.commit('auth/setUserData', userData)
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
