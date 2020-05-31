<template>
  <div>
    <v-form v-model="isValid">
      <v-row>
        <v-col>
          <v-text-field
            :rules="validation.name"
            hide-details="auto"
            label="Nome"
            outlined
            v-model="formData.profile.name"
          />
        </v-col>
        <v-col>
          <v-text-field
            :rules="validation.lastName"
            hide-details="auto"
            label="Sobrenome"
            outlined
            v-model="formData.profile.lastName"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            :rules="validation.document"
            hide-details="auto"
            label="RG"
            outlined
            v-model="formData.user.document"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :rules="validation.email"
            hide-details="auto"
            label="Email"
            outlined
            type="email"
            v-model="formData.user.email"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            :items="LANGUAGES"
            :rules="validation.language"
            hide-details="auto"
            item-text="name"
            item-value="value"
            label="Idioma"
            outlined
            v-model="formData.profile.language"
          ></v-select>
        </v-col>
        <v-col>
          <v-text-field
            :rules="validation.location"
            hide-details="auto"
            label="Localização"
            outlined
            v-model="rawLocation"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :rules="validation.login"
            hide-details="auto"
            label="Login"
            outlined
            v-model="formData.user.username"
          />
        </v-col>
        <v-col>
          <v-text-field
            :rules="validation.password"
            hide-details="auto"
            label="Senha"
            outlined
            type="password"
            v-model="formData.user.password"
          />
        </v-col>
      </v-row>

      <!-- Submit -->
      <v-btn
        :disabled="!isValid"
        block
        color="primary"
        depressed
      >Realizar Cadastro</v-btn>
      <br>
      <pre>{{JSON.stringify(formData, null, 4)}}</pre>
    </v-form>
  </div>
</template>

<script>
import rules from '@/utils/validation-rules'
import LANGUAGES from '@/utils/consts/languages'

export default {
  name: 'LoginForm',
  data: () => ({
    rawLocation: '',
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
        rules.regex(/[a-z0-9_\-\.]+/ig, 'O login só pode conter letras, números, e os seguintes caracteres: _ - .')
      ],
      password: [ rules.required, rules.minSize(8) ],
      name: [ rules.required ],
      lastName: [ rules.required ],
      email: [ rules.required, rules.email ]
    },
    LANGUAGES
  })
}
</script>