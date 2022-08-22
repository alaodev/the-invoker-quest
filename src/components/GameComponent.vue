<template>
  <div class="game">
    <ion-phaser :game.prop="game" :initialize.prop="initialize" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

import config from '@/game/config'

export default {
  name: 'GameComponent',
  setup() {
    const game = ref(config)
    const initialize = ref(false)

    onMounted(() => initialize.value = true)

    return { game, initialize }
  }
}
</script>

<style scoped>
.game {
  align-items: center;
  background-color: #191919;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
}
</style>
