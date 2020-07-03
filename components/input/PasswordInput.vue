<template>
  <v-text-field
    v-bind="$attrs"
    :type="show ? 'text' : 'password'"
    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :value="value"
    @click:append="show = !show"
    @input="value => $emit('input', value)"
    @keydown.enter="() => $emit('submit')"
  />
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['value'],
  data: () => ({
    show: false
  })
}
</script>
