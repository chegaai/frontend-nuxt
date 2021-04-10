<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="loading"
    :search-input.sync="search"
    no-data-text="Nenhum resultado encontrado"
    no-filter
    type="search"
    v-bind="$attrs"
    :disabled="disabled"
    @input="getPlaceDetails"
  />
</template>

<script>
import { extractFields } from '@/utils/addresses.ts'

export default {
  name: 'PlacesSearchInput',
  props: {
    types: {
      type: Array,
      default: () => ['(cities)']
    },
    country: {
      type: String,
      default: 'br'
    },
    returnPlaceId: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    model: '',
    search: '',
    results: [],
    loading: false,
    timeoutId: null,
    autocomplete: null,
    disabled: true
  }),
  computed: {
    items() {
      return this.results.map(result => ({
        text: result.description,
        value: result
      }))
    }
  },
  watch: {
    search(newValue) {
      if (this.timeoutId) { clearTimeout(this.timeoutId) }
      if (!newValue) { return }
      if (newValue === this.model.description) { return }

      this.timeoutId = setTimeout(() => {
        this.loading = true

        this.autocomplete.getPlacePredictions(
          {
            input: newValue,
            componentRestrictions: {
              country: this.country
            },
            types: this.types
          },
          (predictions) => {
            this.loading = false
            this.results = predictions || []
          }
        )
      }, 1000)
    }
  },
  mounted() {
    setTimeout(() => {
      this.autocomplete = new window.google.maps.places.AutocompleteService()
      this.placesService = new window.google.maps.places.PlacesService(
        document.createElement('div')
      )
      this.disabled = false
    }, window.google ? 0 : 1000)
  },
  methods: {
    getPlaceDetails() {
      this.loading = true
      this.placesService.getDetails(
        { placeId: this.model.place_id, fields: ['address_components'] },
        (details) => {
          this.loading = false
          if (!details) { return }

          const result = extractFields(details.address_components)

          if (this.returnPlaceId) { Object.assign(result, { placeId: this.model.place_id }) }

          this.$emit('input', result)
        }
      )
    }
  }
}
</script>
