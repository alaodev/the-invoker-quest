import { spells } from '@/game/constants'

export default class Spells {
  constructor(scene) {
    this.scene = scene
    this.spellsQueue = []
    this.spellsSlots = []
    this.spellsList = spells

    this.initialize()
  }

  static preload(scene) {
    scene.load.image('alacrity', 'assets/images/alacrity.png')
    scene.load.image('chaos-meteor', 'assets/images/chaos_meteor.png')
    scene.load.image('cold-snap', 'assets/images/cold_snap.png')
    scene.load.image('deafening-blast', 'assets/images/deafening_blast.png')
    scene.load.image('emp', 'assets/images/emp.png')
    scene.load.image('forge-spirit', 'assets/images/forge_spirit.png')
    scene.load.image('ghost-walk', 'assets/images/ghost_walk.png')
    scene.load.image('ice-wall', 'assets/images/ice_wall.png')
    scene.load.image('invoke', 'assets/images/invoke.png')
    scene.load.image('sun-strike', 'assets/images/sun_strike.png')
    scene.load.image('tornado', 'assets/images/tornado.png')
    scene.load.image('unknown', 'assets/images/unknown.png')
  }

  initialize() {
    this.spellsSlots = this.scene.add.container(535, -50)

    for (let i = 0; i < 2; i++) {
      let spellSlot = this.scene.add.sprite(0, 115 * (i + 1), 'unknown')

      spellSlot.setDisplaySize(100, 100)

      this.spellsSlots.add(spellSlot)
      this.spellsQueue.push('unknown')
    }
  }

  getSpell() {
    if (this.scene.orbs.orbsQueue.length > 2) {
      const orbsCombinantion = this.scene.orbs.orbsQueue.map(orbObject => orbObject.key)
      const combination = orbsCombinantion.sort().join('')

      return this.spellsList.find(spell => spell.combination === combination)
    }

    return { name: 'Combination not found', sprite: 'unknown' }
  }

  pushSpell(spell) {
    const indexOfUnknown = this.spellsQueue.findIndex(spell => spell === 'unknown')

    if (indexOfUnknown !== -1) {
      this.spellsQueue[indexOfUnknown] = spell
    } else {
      this.spellsQueue.pop()
      this.spellsQueue.unshift(spell)
    }

    this.updateSpellsSprite()
  }

  updateSpellsSprite() {
    for (let [index, spellSlot] of this.spellsSlots.list.entries()) {
      spellSlot.setTexture(this.spellsQueue[index] || 'unknown')
    }
  }
}