<template>
  <v-container fluid>
    <h1>Home!</h1>
    {{ JSON.stringify(events) }}
    <event-card />
  </v-container>
</template>

<script>
import { getServicesFromContext } from '~/services'
import EventCard from '~/components/events/EventCard'

export default {
  components: {
    EventCard
  },
  asyncData: (context) => {
    return getServicesFromContext(context).events
      .getAll()
      .then(events => ({ events }))
  }
}
</script>
