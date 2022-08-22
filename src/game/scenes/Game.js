import Phaser from 'phaser'

import Cursors from '../models/Cursors'
import Orbs from '../models/Orbs'
import Spells from '../models/Spells'
import Field from '../models/Field'

export default class Game extends Phaser.Scene {
  constructor() {
    super('game')

    this.cursors = undefined
    this.orbs = undefined
    this.spells = undefined
    this.field = undefined

    this.spellSlot = undefined
  }

  init() {
    this.cameras.main.setBackgroundColor('#000000')
  }

  preload() {
    Spells.preload(this)
    Orbs.preload(this)
    Field.preload(this)
    this.load.image('background', 'assets/images/background.png')
    this.load.image('invoke-key', 'assets/images/invoke_key.png')
    this.load.image('invoker', 'assets/images/invoker.png')
  }

  create() {
    this.add.image(300, 400, 'background')
    this.add.image(300, 520, 'invoke-key')

    this.add.sprite(100, 700, 'invoker')

    this.cursors = new Cursors(this)
    this.orbs = new Orbs(this)
    this.spells = new Spells(this)
    this.field = new Field(this)
  }

  update() {
    this.cursors.update()
    this.orbs.update()
    this.field.update()
  }
}