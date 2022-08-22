import Phaser from 'phaser'

import Game from '@/game/scenes/Game'

export default {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
}