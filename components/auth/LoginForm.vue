<template>
  <v-form ref="form" v-model="isValid">
    <v-text-field
      v-model="handle"
      :readonly="loading"
      :rules="validation.login"
      label="Email ou login"
      outlined
      @input="resetErrors"
    />
    <password-input
      v-model="password"
      :readonly="loading"
      :rules="validation.password"
      label="Senha"
      outlined
      type="password"
      @input="resetErrors"
      @submit="login"
    />

    <v-expand-transition>
      <v-alert v-if="hasError" type="error" transition="expand-transition">
        {{ errorMessage }}
      </v-alert>
    </v-expand-transition>

    <v-btn :disabled="!isValid" :loading="loading" block color="primary" depressed @click="login">
      Login
    </v-btn>
  </v-form>
</template>

<script>
import rules from '@/utils/validation-rules'
import { getErrorFormatter } from '@/utils/error-messages'

// Components
import PasswordInput from '@/components/input/PasswordInput'

const formatError = getErrorFormatter('login')

export default {
  name: 'LoginForm',
  components: {
    PasswordInput
  },
  data: () => ({
    handle: '',
    password: '',
    loading: false,
    isValid: false,
    hasError: false,
    buttonColor: 'primary',
    errorMessage: '',
    validation: {
      login: [rules.required],
      password: [rules.required, rules.minSize(8)]
    }
  }),
  methods: {
    resetErrors() {
      if (!this.$refs.form) {
        return
      }
      this.$refs.form.resetValidation()
      this.hasError = false
      this.errorMessage = ''
    },
    async login() {
      this.resetErrors()
      this.loading = true

      await this.$services.auth
        .login(this.handle, this.password)
        .then(token => {
          this.$emit('success', { token })
        })
        .catch(err => {
          this.hasError = true
          this.errorMessage = formatError(err)
          this.$emit('error', err)
        })

      this.loading = false
    }
  }
}
</script>
