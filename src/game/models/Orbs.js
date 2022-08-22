export default class Orbs {
  constructor(scene) {
    this.scene = scene
    this.orbsQueue = []
    this.orbs = undefined

    this.initialize()
  }

  static preload(scene) {
    scene.load.image('no-orb', 'assets/images/no_orb.png')
    scene.load.image('quas', 'assets/images/quas_orb.png')
    scene.load.image('wex', 'assets/images/wex_orb.png')
    scene.load.image('exort', 'assets/images/exort_orb.png')
  }

  initialize() {
    this.orbs = this.scene.add.container(46, 600)

    for (let i = 0; i < 3; i++) {
      let sprite = this.scene.physics.add.sprite(i * 50, 0, 'no-orb')
      sprite.setDisplaySize(40, 40)
      sprite.setVelocityX(200)
      sprite.body.setAllowGravity(false)
      this.orbs.add(sprite)
    }
  }


  pushOrbs(orb) {
    if (this.orbsQueue.length > 2) {
      this.orbsQueue.pop()
      this.orbsQueue.unshift(orb)
    } else {
      this.orbsQueue.unshift(orb)
    }

    this.updateOrbsSprite()
  }

  updateOrbsSprite() {
    for (let [index, orb] of this.orbs.list.entries()) {
      orb.setTexture(this.orbsQueue[index]?.orb || 'no-orb')
    }
  }

  update() {
    this.orbs.iterate(child => {
      if (child.x > 100) {
        child.setVelocityX(-200)
      } else if (child.x < 0) {
        child.setVelocityX(200)
      }
    })
  }
}