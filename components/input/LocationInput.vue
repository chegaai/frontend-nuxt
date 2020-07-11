<template>
  <gmap-autocomplete
    :options="{ componentRestrictions: { country: 'br' } }"
    select-first-on-enter
    @place_changed="processLocationChanged"
  >
    <template v-slot:input="slotProps">
      <v-text-field
        ref="input"
        :loading="loading"
        :value="placeName"
        :placeholder="placeholder"
        v-bind="inputOptions"
        @input="value => (loading = Boolean(value))"
        @listeners="slotProps.listeners"
        @attrs="slotProps.attrs"
        @click:clear="clear"
      />
    </template>
  </gmap-autocomplete>
  <!-- <GmapMap
      v-if="canShowMaps"
      :center="{
            lat: location.lat,
            lng: location.lng,
          }"
      :zoom="15"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :position="{
              lat: location.lat,
              lng: location.lng,
            }"
        :clickable="true"
        :draggable="true"
      />
    </GmapMap> -->
</template>

<script>
export default {
  name: 'LocationInput',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    inputOptions: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    placeName: '',
    loading: false,
    location: {
      name: '',
      placeId: '',
      address: '',
      zipCode: '',
      number: '',
      complement: '',
      country: '',
      city: '',
      state: '',
      lat: null,
      lng: null
    }
  }),
  watch: {
    value(value) {
      this.location = { ...value }
    }
  },
  mounted() {
    this.location = { ...this.value }
  },
  // computed: {
  //   canShowMaps () {
  //     return !!this.location.lat && !!this.location.lng
  //   }
  // },
  methods: {
    clear() {
      this.location = {
        name: '',
        placeId: '',
        address: '',
        zipCode: '',
        number: '',
        complement: '',
        country: '',
        city: '',
        state: '',
        lat: null,
        lng: null
      }

      this.placeName = ''
      this.loading = false
    },
    processLocationChanged(payload) {
      this.location.placeId = payload.place_id
      this.location.name = payload.name
      this.location.address = payload.formatted_address

      const STATE_KEY = 'administrative_area_level_1'
      const CITY_KEY = 'administrative_area_level_2'
      const COUNTRY_KEY = 'country'
      const NUMBER_KEY = 'street_number'
      const ZIP_CODE_KEY = 'postal_code'

      payload.address_components.forEach(address => {
        if (address.types.includes(STATE_KEY)) {
          this.location.state = address.long_name
        }
        if (address.types.includes(CITY_KEY)) {
          this.location.city = address.long_name
        }
        if (address.types.includes(COUNTRY_KEY)) {
          this.location.country = address.long_name
        }
        if (address.types.includes(NUMBER_KEY)) {
          this.location.number = address.long_name
        }
        if (address.types.includes(ZIP_CODE_KEY)) {
          this.location.zipCode = address.long_name
        }
      })

      if (payload.name && payload.formatted_address) {
        this.placeName = this.location.city
          ? `${payload.formatted_address}`
          : `${payload.name} - ${payload.formatted_address}`
      }

      this.location.lat = Number(payload.geometry.location.lat())
      this.location.lng = Number(payload.geometry.location.lng())
      this.loading = false
      this.$emit('input', this.location)
    }
  }
}
</script>
