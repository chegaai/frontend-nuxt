<template>
  <v-list-item>
    <v-list-item-icon v-if="hasIcon">
      <v-img
        :alt="icon.title"
        width="20px"
        :style="iconStyle"
        contain
        aria-hidden="true"
        v-html="iconSvg"
      />
    </v-list-item-icon>
    <v-list-item-title>
      <template v-if="!hasIcon">
        {{ network.name }}
      </template>{{ network.url }}
    </v-list-item-title>
    <v-list-item-action>
      <v-btn icon @click="removeNetwork()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import slug from 'slug'
import icons from 'simple-icons'

const slugifyedIcons = Object.fromEntries(Object.entries(icons).map(([key, value]) => [slug(key), value]))

export default {
  name: 'SocialNetworkItem',
  props: {
    network: {
      required: true,
      type: Object
    }
  },
  computed: {
    iconSlug () {
      return slug(this.network.name)
    },
    hasIcon () {
      return this.iconSlug in slugifyedIcons
    },
    iconSvg () {
      if (!this.hasIcon) { return '' }
      return slugifyedIcons[this.iconSlug].svg
    },
    icon () {
      return slugifyedIcons[this.iconSlug]
    },
    iconStyle () {
      return `fill: #${this.icon.hex}`
    }
  },
  methods: {
    removeNetwork () {
      this.$emit('remove', this.network)
    }
  }
}
</script>
