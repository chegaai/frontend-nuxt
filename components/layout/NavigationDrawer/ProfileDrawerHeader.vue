<template>
  <v-list color="primary" :dark="!isMini">
    <v-list-item :class="{ 'px-2': isMini }">
      <v-list-item-action>
        <v-avatar :size="40">
          <v-img :src="$auth.user.picture" />
        </v-avatar>
      </v-list-item-action>
    </v-list-item>

    <v-list-item v-if="!isMini">
      <v-list-item-content>
        <v-list-item-title>{{ userName }}</v-list-item-title>
        <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="toggleMini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'ProfileDrawerHeader',
  props: {
    isMini: {
      type: Boolean,
      deafault: true
    }
  },
  computed: {
    userName() {
      const { name, lastName } = this.$auth.user
      return `${name} ${lastName}`
    }
  },
  methods: {
    toggleMini() {
      this.$emit('toggleMini')
    }
  }
}
</script>
