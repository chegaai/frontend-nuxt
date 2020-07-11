<template>
  <v-container fluid>
    <h1>Perfil</h1>
    <v-form>
      <v-container>
        <v-row justify="center" class="pb-6">
          <profile-picture v-model="formData.picture" />
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="formData.name" label="Nome" />
          </v-col>
          <v-col>
            <v-text-field v-model="formData.lastName" label="Sobrenome" />
          </v-col>
        </v-row>
        <v-row>
          <v-col />
          <v-col />
        </v-row>
      </v-container>
    </v-form>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>User Data</v-expansion-panel-header>
        <v-expansion-panel-content>
          <pre>{{ JSON.stringify(userData, null, 4) }}</pre>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>Form Data</v-expansion-panel-header>
        <v-expansion-panel-content>
          <pre>{{ JSON.stringify(formData, null, 4) }}</pre>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import clone from 'lodash.clonedeep'

import ProfilePicture from '~/components/profile/ProfilePicture'

export default {
  name: 'ProfilePage',
  components: { ProfilePicture },
  data: () => ({ formData: { picture: '' } }),
  computed: {
    ...mapState('auth', ['userData'])
  },
  watch: {
    userData(content) {
      this.formData = clone(content)
    }
  },
  mounted() {
    this.formData = clone(this.userData)
  },
  methods: {
    pickImage() {
      alert('pick')
    }
  }
}
</script>
