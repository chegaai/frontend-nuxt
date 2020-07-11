<template>
  <v-container style="height: 100%;">
    <br />
    <br />
    <v-row justify="center" align="center">
      <logo />
    </v-row>
    <br />
    <br />
    <br />
    <v-row justify="center" align="center">
      <v-expand-transition>
        <v-alert v-if="alert.display" :type="alert.type">
          {{ alert.message }}
        </v-alert>
      </v-expand-transition>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col md="4" align-self="center">
        <v-card>
          <v-tabs v-model="tab">
            <v-tab>Login</v-tab>
            <v-tab>Cadastro</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-container>
                <login-form @success="login" @error="displayError" />
              </v-container>
            </v-tab-item>

            <v-tab-item>
              <v-container>
                <signup-form @success="signup" @error="displayError" />
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import Logo from '@/components/Logo'

export default {
  name: 'LoginPage',
  layout: 'blank',
  components: {
    LoginForm,
    SignupForm,
    Logo
  },
  data: () => ({
    tab: 0,
    alert: {
      display: false,
      type: 'success',
      message: ''
    }
  }),
  methods: {
    displayAlert(message, type = 'success') {
      this.alert.message = message
      this.alert.type = type
      this.alert.display = true
    },
    login({ token }) {
      this.$store.dispatch('auth/login', token)
      this.$router.push('/')
    },
    signup(user) {
      this.tab = 0
      this.displayAlert(`Boas vindas, ${user.profile.name}. Você já pode realizar o seu login!`)
    },
    displayError(error) {
      console.error(error)
    }
  },
  head: () => ({ title: 'Login' })
}
</script>
