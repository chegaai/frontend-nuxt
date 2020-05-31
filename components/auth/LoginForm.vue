<template>
  <div>
    <v-form v-model="isValid">
      <v-text-field
        :rules="validation.login"
        label="Login"
        outlined
        v-model="login"
      />
      <v-text-field
        :rules="validation.password"
        label="Senha"
        outlined
        type="password"
        v-model="password"
      />
      <v-btn
        :disabled="!isValid"
        block
        color="primary"
        depressed
      >Login</v-btn>
    </v-form>
  </div>
</template>

<script>
import rules from '@/utils/validation-rules'

export default {
  name: 'LoginForm',
  data: () => ({
    login: '',
    password: '',
    isValid: false,
    validation: {
      login: [ rules.required ],
      password: [ rules.required, rules.minSize(8) ]
    }
  })
}
</script>