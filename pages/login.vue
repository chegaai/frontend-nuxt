<template>
  <v-container style="height: 100%">
    <br />
    <br />
    <v-row
      justify="center"
      align="center"
    >
      <logo />
    </v-row>
    <br />
    <br />
    <br />
    <v-row
      justify="center"
      align="center"
      no-gutters
    >
      <v-col
        md="4"
        align-self="center"
      >
        <v-card>
          <v-tabs v-model="tab">
            <v-tab>Login</v-tab>
            <v-tab>Cadastro</v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-container>
                <login-form />
              </v-container>
            </v-tab-item>
            <v-tab-item>
              <v-container>
                <signup-form />
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
import LoginForm from '@/components/auth/LoginForm'
import SignupForm from '@/components/auth/SignupForm'
import Logo from '@/components/Logo'

export default {
  name: 'LoginPage',
  layout: 'blank',
  data () {
    return {
      tab: 0
    }
  },
  head: () => ({ title: 'Login' }),
  components: {
    LoginForm,
    SignupForm,
    Logo
  }
}
</script>