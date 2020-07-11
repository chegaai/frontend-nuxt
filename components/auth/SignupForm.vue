<template>
  <v-form v-model="isValid">
    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.profile.name"
          :rules="validation.name"
          hide-details="auto"
          label="Nome"
          outlined
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formData.profile.lastName"
          :rules="validation.lastName"
          hide-details="auto"
          label="Sobrenome"
          outlined
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.user.email"
          :rules="validation.email"
          hide-details="auto"
          label="Email"
          outlined
          type="email"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="formData.user.document"
          :rules="validation.document"
          hide-details="auto"
          label="RG"
          outlined
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-select
          v-model="formData.profile.language"
          :items="LANGUAGES"
          :rules="validation.language"
          hide-details="auto"
          item-text="name"
          item-value="value"
          label="Idioma"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <location-input
          v-model="rawLocation"
          :rules="validation.location"
          :options="{ types: ['administrative_area_level_2'] }"
          :input-options="{ ['hide-details']: 'auto', outlined: true, label: 'Cidade', clearable: true }"
          placeholder="ex: São Paulo, SP"
          @input="setLocation"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="formData.user.username"
          :rules="validation.login"
          hide-details="auto"
          label="Login"
          outlined
        />
      </v-col>
      <v-col>
        <password-input
          v-model="formData.user.password"
          :rules="validation.password"
          hide-details="auto"
          label="Senha"
          outlined
          type="password"
        />
      </v-col>
    </v-row>

    <v-expand-transition>
      <v-alert v-if="hasError" type="error" transition="expand-transition">
        {{ errorMessage }}
      </v-alert>
    </v-expand-transition>

    <!-- Submit -->
    <v-btn :disabled="!isValid" block color="primary" depressed @click="signUp">
      Realizar Cadastro
    </v-btn>
    <br />
    <pre>{{ JSON.stringify(formData, null, 4) }}</pre>
  </v-form>
</template>

<script>
import rules from '@/utils/validation-rules'
import LANGUAGES from '@/utils/consts/languages'
import { getErrorFormatter } from '@/utils/error-messages'

// Components
import LocationInput from '@/components/input/LocationInput'
import PasswordInput from '@/components/input/PasswordInput'

const formatError = getErrorFormatter('signup')

export default {
  name: 'LoginForm',
  components: {
    LocationInput,
    PasswordInput
  },
  data: () => ({
    rawLocation: {},
    hasError: false,
    errorMessage: '',
    loading: false,
    formData: {
      user: {
        username: '',
        password: '',
        email: '',
        document: ''
      },
      profile: {
        name: '',
        lastName: '',
        language: '',
        location: {
          city: '',
          country: '',
          state: ''
        }
      }
    },
    isValid: false,
    validation: {
      login: [
        rules.required,
        rules.minSize(3),
        rules.regex(/[a-z0-9_\-.]+/gi, 'O login só pode conter letras, números, e os seguintes caracteres: _ - .')
      ],
      password: [rules.required, rules.minSize(8)],
      name: [rules.required],
      lastName: [rules.required],
      email: [rules.required, rules.email]
    },
    LANGUAGES
  }),
  methods: {
    setLocation({ city = '', country = '', state = '' }) {
      this.formData.profile.location = { city, country, state }
    },
    async signUp() {
      this.loading = true

      await this.$services.auth
        .signUp(this.formData)
        .then(user => {
          this.$emit('success', user)
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
