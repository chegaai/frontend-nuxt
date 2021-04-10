<template>
  <div>
    <v-expand-transition>
      <v-alert
        :type="alertData.type"
        v-if="alertData.visible"
        :dismissible="alertData.dismissible"
      >
        {{ alertData.message }}
      </v-alert>
    </v-expand-transition>
    <v-form v-model="isValid">
      <v-row>
        <v-col>
          <v-text-field
            :rules="validation.name"
            hide-details="auto"
            label="Nome"
            outlined
            :disabled="loading"
            v-model="formData.profile.name"
          />
        </v-col>
        <v-col>
          <v-text-field
            :rules="validation.lastName"
            hide-details="auto"
            label="Sobrenome"
            outlined
            :disabled="loading"
            v-model="formData.profile.lastName"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            :rules="validation.document"
            hide-details="auto"
            label="RG"
            outlined
            :disabled="loading"
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
            :disabled="loading"
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
            :disabled="loading"
            v-model="formData.profile.language"
          ></v-select>
        </v-col>
        <v-col>
          <places-search-input
            outlined
            :disabled="loading"
            label="Cidade"
            v-model="formData.profile.location"
            hide-details="auto"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-text-field
            :rules="validation.login"
            hide-details="auto"
            label="Login"
            outlined
            :disabled="loading"
            v-model="formData.user.username"
          />
        </v-col>
        <v-col>
          <v-text-field
            :rules="validation.password"
            hide-details="auto"
            label="Senha"
            outlined
            :disabled="loading"
            type="password"
            v-model="formData.user.password"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <!-- Submit -->
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="primary"
            @click="signup"
          >
            Realizar Cadastro
            <template v-slot:loader>
              <span>Carregando...</span>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
  import rules from '@/utils/validation-rules'
  import LANGUAGES from '@/utils/consts/languages'
  import PlacesSearchInput from '@/components/location/PlacesSearchInput.vue'

  export default {
    name: 'LoginForm',
    data: () => ({
      loading: false,
      alertData: {
        type: '',
        message: '',
        visible: false,
        dismissible: false
      },
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
          rules.regex(
            /[a-z0-9_\-\.]+/gi,
            'O login só pode conter letras, números, e os seguintes caracteres: _ - .'
          )
        ],
        password: [rules.required, rules.minSize(8)],
        name: [rules.required],
        lastName: [rules.required],
        email: [rules.required, rules.email]
      },
      LANGUAGES
    }),
    components: {
      PlacesSearchInput
    },
    mounted() {
      window.component = this
    },
    methods: {
      signup() {
        this.loading = true
        this.$services.auth
          .signup(this.formData)
          .then(() => {
            this.alert('success', 'Usuário criado com sucesso!', 1000).then(
              () => {
                this.$emit('done')
              }
            )
          })
          .catch(err => {
            this.alert('error', `Erro ao criar usuário: ${err.message}`)
          })
          .finally(() => (this.loading = false))
      },
      alert(type, message, timeout) {
        return new Promise(resolve => {
          this.alertData.visible = false
          this.alertData.type = type
          this.alertData.message = message
          this.alertData.visible = true
          this.alertData.dismissible = !timeout

          if (timeout) {
            setTimeout(() => {
              this.alertData.visible = false
              this.alertData.type = ''
              this.alertData.message = ''
              resolve()
            }, timeout)
          }

          if (!timeout) {
            resolve()
          }
        })
      }
    }
  }
</script>

<style>
  .vbga-results {
    list-style-type: none;
  }
</style>
