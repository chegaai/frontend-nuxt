<template>
  <div>
    <v-form ref="form" v-model="isValid">
      <v-text-field
        v-model="handle"
        :rules="validation.handle"
        label="Login"
        outlined
        :disabled="loading"
      />
      <v-text-field
        v-model="password"
        :rules="validation.password"
        label="Senha"
        outlined
        :disabled="loading"
        type="password"
        @keydown.enter="login"
      />
      <v-btn
        :disabled="!isValid || loading"
        block
        color="primary"
        depressed
        @click.prevent="login"
        @keydown.enter="login"
      >
        Login
      </v-btn>
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
      if (!this.isValid) { return }
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
