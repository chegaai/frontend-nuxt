<template>
  <v-list>
    <v-tooltip
      v-for="(item, i) in items"
      :key="i"
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-list-item
          :to="item.to"
          router
          exact
          :alt="item.title"
        >
          <v-list-item-action v-bind="attrs" v-on="on">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <span>{{ item.title }}</span>
    </v-tooltip>
  </v-list>
</template>

<script>
export default {
  name: 'NavigationDrawerItems',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
