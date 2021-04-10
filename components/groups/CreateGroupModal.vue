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
              <v-row dense>
                <v-col cols="4">
                  <v-text-field v-model="newSocialNetwork.name" label="Name" outlined />
                </v-col>
                <v-col cols="7">
                  <v-text-field v-model="newSocialNetwork.url" label="URL" outlined />
                </v-col>
                <v-col class="pt-4 pl-4" cols="1">
                  <v-btn :disabled="!canAddSocialNetwork" icon text @click="addSocialNetwork">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-expand-transition>
                    <v-card v-show="form.socialNetworks.length">
                      <v-list>
                        <v-list-item v-for="network in form.socialNetworks" :key="network.name">
                          <v-list-item-title>
                            {{ network.name }} {{ network.url }}
                          </v-list-item-title>
                          <v-list-item-action>
                            <v-btn icon @click="removeSocialNetwork(network)">
                              <v-icon>mdi-close</v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-expand-transition>
                </v-col>
              </v-row>
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
export default {
  name: 'CreateGroupDialog',
  components: {
    PlacesSearchInput
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
    },
    newSocialNetwork: {
      name: '',
      url: ''
    }
  }),
  computed: {
    canAddSocialNetwork () {
      const isFormFilled = this.newSocialNetwork.name && this.newSocialNetwork.url
      const urlExists = this.form.socialNetworks.find(network => network.url.toLowerCase() === this.newSocialNetwork.url.toLowerCase())
      const nameExists = this.form.socialNetworks.find(network => network.name.toLowerCase() === this.newSocialNetwork.name.toLowerCase())

      return isFormFilled && !urlExists && !nameExists
    }
  },
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
    },
    addSocialNetwork () {
      const { name, url } = this.newSocialNetwork

      this.form.socialNetworks.push({ name, url })
      this.newSocialNetwork = { name: '', url: '' }
    },
    removeSocialNetwork ({ name }) {
      this.form.socialNetworks = this.form.socialNetworks.filter(socialNetwork => socialNetwork.name !== name)
    }
  }
}
</script>
