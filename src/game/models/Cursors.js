import Phaser from 'phaser'

export default class Cursors {
  constructor(scene) {
    this.scene = scene
    this.keys = {
      q: undefined,
      w: undefined,
      e: undefined,
      r: undefined
    }
    this.keysLock = {
      q: false,
      w: false,
      e: false,
      r: false
    }

    this.initialize()
  }

  initialize() {
    this.keys.q = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
    this.keys.w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.keys.e = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    this.keys.r = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

    this.scene.input.keyboard.on('keydown-Q', this.unlock.bind(this, 'q'))
    this.scene.input.keyboard.on('keydown-W', this.unlock.bind(this, 'w'))
    this.scene.input.keyboard.on('keydown-E', this.unlock.bind(this, 'e'))
    this.scene.input.keyboard.on('keydown-R', this.unlock.bind(this, 'r'))
  }

  unlock(key) {
    this.keysLock[key] = false
  }

  update() {
    if (this.keys.q.isDown && this.keysLock.q === false) {
      this.scene.orbs.pushOrbs({ key: 'Q', orb: 'quas' })
      this.keysLock.q = true
    }

    if (this.keys.w.isDown && this.keysLock.w === false) {
      this.scene.orbs.pushOrbs({ key: 'W', orb: 'wex' })
      this.keysLock.w = true
    }

    if (this.keys.e.isDown && this.keysLock.e === false) {
      this.scene.orbs.pushOrbs({ key: 'E', orb: 'exort' })
      this.keysLock.e = true
    }
  }
}