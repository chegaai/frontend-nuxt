<template>
  <div>
    <v-card :loading="loading" outlined>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-card-title>
              Grupos
              <v-spacer />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn :disabled="loading" v-bind="attrs" icon @click="openCreationModal" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Novo Grupo</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn :disabled="loading" v-bind="attrs" icon v-on="on" @click="loadGroups">
                    <v-icon>mdi-reload</v-icon>
                  </v-btn>
                </template>
                <span>Atualizar</span>
              </v-tooltip>
            </v-card-title>
          </v-col>
        </v-row>
        <v-row><v-divider /></v-row>
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="4">
            {{ displayText }}
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <create-group-modal ref="createGroupModal" @done="loadGroups" />
  </div>
</template>

<script>
import CreateGroupModal from '~/components/groups/CreateGroupModal.vue'
export default {
  name: 'GroupsPage',
  components: { CreateGroupModal },
  data: () => ({
    groups: [],
    loading: false
  }),
  computed: {
    displayText () {
      return this.loading ? 'Carregando. Aguarde...' : 'Nenhum grupo encontrado'
    }
  },
  mounted () {
    this.loadGroups()
  },
  methods: {
    loadGroups () {
      this.loading = true
      this.$services.groups.getAll()
        .then((groups) => {
          this.groups = groups
        })
        // eslint-disable-next-line no-console
        .catch(console.error)
        .finally(() => {
          this.loading = false
        })
    },
    openCreationModal () {
      this.$refs.createGroupModal.open()
    }
  },
  head: ({ $config }) => ({
    title: 'Grupos',
    script: [
      {
        hid: 'placesApi',
        async: true,
        src: `https://maps.googleapis.com/maps/api/js?key=${$config.placesApiKey}&libraries=places`
      }
    ]
  })
}
</script>
