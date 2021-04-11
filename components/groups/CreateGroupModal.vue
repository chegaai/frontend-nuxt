<template>
  <v-dialog persistent max-width="800px" :value="visible">
    <v-card>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>
          <span class="headline">Novo grupo</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-container fluid>
          <v-form :disabled="loading">
            <v-divider />
            <v-card-title><span class="hadline">Informações Básicas</span></v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="5">
                  <v-text-field v-model="form.name" outlined label="Nome" />
                </v-col>
                <v-col cols="7">
                  <v-combobox
                    v-model="form.tags"
                    outlined
                    clearable
                    multiple
                    small-chips
                    label="Tags"
                  />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <places-search-input v-model="form.location" label="Cidade" outlined />
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-textarea v-model="form.description" outlined label="Descrição" />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-title><span class="hadline">Redes Sociais</span></v-card-title>
            <v-card-text>
              <social-network-list v-model="form.socialNetworks" />
            </v-card-text>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="loading" text color="error" @click="cancel">
          Cancelar
        </v-btn>
        <v-btn :loading="loading" text color="primary" @click="save">
          Salvar
        </v-btn>
      </v-card-actions>
      <v-divider />
      <pre>{{ JSON.stringify(form, null, 4) }}</pre>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
import PlacesSearchInput from '../location/PlacesSearchInput.vue'
import SocialNetworkList from './SocialNetworkList.vue'

export default {
  name: 'CreateGroupDialog',
  components: {
    PlacesSearchInput,
    SocialNetworkList
  },
  data: () => ({
    visible: true,
    loading: false,
    form: {
      name: '',
      description: '',
      tags: [],
      location: {
        city: '',
        state: '',
        country: ''
      },
      socialNetworks: []
    }
  }),
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    cancel () {
      this.$emit('canceled')
      this.close()
    },
    complete () {
      this.$emit('done')
      this.close()
    },
    save () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.complete()
      }, 5000)
    }
  }
}
</script>
