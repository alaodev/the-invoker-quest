import Phaser from 'phaser';

export default class Field {
  constructor(scene) {
    this.scene = scene
    this.marker = undefined
    this.fieldSpells = undefined
    this.clock = 0

    this.initialize()
  }

  static preload(scene) {
    scene.load.image('field', 'assets/images/invoke_field.png')
    scene.load.image('marker', 'assets/images/marker.png')
  }

  initialize() {
    this.scene.add.sprite(300, 245, 'field').alpha = .8

    this.marker = this.scene.physics.add.sprite(300, 245, 'marker')

    this.fieldSpells = this.scene.physics.add.group()

    this.scene.physics.add.overlap(this.fieldSpells, this.marker, this.spellUponMarker, null, this);
  }

  update() {
    if (this.clock === 60) {
      const possibleValuesX = [200, 267, 334, 400]

      let x = possibleValuesX[Math.floor(Math.random() * possibleValuesX.length)]
      let randomSprite = Phaser.Math.Between(0, 9)
      let fieldSpell = this.fieldSpells.create(x, -35, this.scene.spells.spellsList[randomSprite].sprite)

      fieldSpell.setDisplaySize(60, 60)
      fieldSpell.setVelocityY(200)

      this.clock = 0
    } else {
      this.clock += 1
    }

    this.fieldSpells.children.iterate(child => {
      if (child && child.y > 400) {
        child.destroy()
      }
    })
  }

  spellUponMarker(_, field) {
    if (this.scene.cursors.keys.r.isDown && this.scene.cursors.keysLock.r === false) {
      const spellSprite = this.scene.spells.getSpell().sprite
      if (spellSprite === field.texture.key) {
        this.scene.spells.pushSpell(spellSprite)
        this.scene.cursors.keysLock.r = true
        field.destroy()
      }
    }
  }

}