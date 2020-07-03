<template>
  <div>
    <input
      ref="pictureUpload"
      type="file"
      name="picture"
      hidden
      @change="setNewPicture"
    >

    <v-avatar
      size="200"
      style="cursor: pointer"
      title="Alterar imagem"
      @click="openFilePicker"
    >
      <v-hover v-slot:default="{ hover }">
        <v-img :src="value">
          <v-fade-transition>
            <div
              v-if="hover"
              class="align-self-center v-card--reveal flex-grow-1 white"
            >
              <v-icon
                x-large
                color="grey"
              >
                photo_camera
              </v-icon>
            </div>
          </v-fade-transition>
        </v-img>
      </v-hover>
    </v-avatar>
  </div>
</template>

<script>
const readFileAsDataURL = file => new Promise((resolve, reject) => {
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    resolve(fileReader.result)
  }

  fileReader.onerror = reject

  fileReader.readAsDataURL(file)
})

export default {
  name: 'ProfilePicture',
  props: {
    value: { type: String, required: true }
  },
  methods: {
    async setNewPicture ({ target: { files: [file] } }) {
      const fileDataURL = await readFileAsDataURL(file)
      this.$emit('input', fileDataURL)
    },
    openFilePicker () {
      this.$refs.pictureUpload.click()
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
