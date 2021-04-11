<template>
  <div>
    <v-row dense>
      <v-col cols="4">
        <v-combobox
          v-model="newSocialNetwork.name"
          :items="availableIcons"
          label="Name"
          outlined
        />
      </v-col>
      <v-col cols="7">
        <v-text-field
          v-model="newSocialNetwork.url"
          :rules="[isValidUrl]"
          prefix="https://"
          label="URL"
          outlined
        />
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
          <v-card v-show="socialNetworks.length">
            <v-list>
              <template
                v-for="network in socialNetworks"
              >
                <social-network-item
                  :key="network.name"
                  :network="network"
                  @remove="removeSocialNetwork"
                />
              </template>
            </v-list>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import icons from 'simple-icons'
import SocialNetworkItem from './SocialNetworkItem.vue'

export default {
  name: 'SocialNetworkList',
  components: { SocialNetworkItem },
  props: {
    value: {
      type: Array,
      required: true,
      default: () => ([])
    }
  },
  data: () => ({
    newSocialNetwork: {
      name: '',
      url: ''
    },
    socialNetworks: []
  }),
  computed: {
    canAddSocialNetwork () {
      const isFormFilled = this.newSocialNetwork.name && this.newSocialNetwork.url
      if (!isFormFilled) { return false }
      const urlExists = this.socialNetworks.find(network => network.url.toLowerCase() === this.newSocialNetwork.url.toLowerCase())
      const nameExists = this.socialNetworks.find(network => network.name.toLowerCase() === this.newSocialNetwork.name.toLowerCase())

      return isFormFilled && !urlExists && !nameExists
    },
    availableIcons () {
      return Object.values(icons).map(icon => icon.title)
    }
  },
  watch: {
    value (newValue) {
      this.socialNetworks = newValue
    }
  },
  mounted () {
    this.socialNetworks = this.value
  },
  methods: {
    update () {
      this.$emit('input', this.socialNetworks)
    },
    addSocialNetwork () {
      const { name, url } = this.newSocialNetwork

      this.socialNetworks.push({ name, url: `https://${url}` })
      this.newSocialNetwork = { name: '', url: '' }
      this.update()
    },
    removeSocialNetwork ({ name }) {
      this.socialNetworks = this.socialNetworks.filter(socialNetwork => socialNetwork.name !== name)
      this.update()
    },
    isValidUrl (value) {
      if (!value) { return true }
      const url = `https://${value}`

      try {
        // eslint-disable-next-line no-new
        new URL(url)
        return true
      } catch (err) {
        return 'Digite uma URL válida'
      }
    }
  }
}
</script>
