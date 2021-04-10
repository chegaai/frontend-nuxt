<template>
  <div>
    <v-form ref="form" v-model="isValid">
      <v-text-field
        :rules="validation.handle"
        label="Login"
        outlined
        :disabled="loading"
        v-model="handle"
      />
      <v-text-field
        :rules="validation.password"
        label="Senha"
        outlined
        :disabled="loading"
        type="password"
        v-model="password"
        @keydown.enter="login"
      />
      <v-btn
        :disabled="!isValid || loading"
        block
        color="primary"
        @click.prevent="login"
        @keydown.enter="login"
        depressed
        >Login</v-btn
      >
    </v-form>
  </div>
</template>

<script>
  import rules from '@/utils/validation-rules'

  export default {
    name: 'LoginForm',
    data: () => ({
      handle: '',
      password: '',
      isValid: false,
      loading: false,
      validation: {
        handle: [rules.required],
        password: [rules.required, rules.minSize(8)]
      }
    }),
    methods: {
      login() {
        this.$refs.form.validate()
        if (!this.isValid) return
        this.loading = true
        this.$auth
          .loginWith('local', {
            data: {
              handle: this.handle,
              password: this.password
            }
          })
          .then(() => {
            this.$router.push('/')
          })
          .finally(() => {
            this.loading = false
          })
      }
    }
  }
</script>
