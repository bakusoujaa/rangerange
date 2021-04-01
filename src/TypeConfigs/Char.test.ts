import Rangerange from '../'

describe('char', () => {
  let minimum = null
  let maximum = null

  describe('toArray()', () => {
    describe('if minimum < maximum', () => {
      minimum = 'a'
      maximum = 'd'

      const rangerange = new Rangerange({ minimum, maximum })

      it('be incremented array', () => {
        expect(rangerange.toArray()).toStrictEqual(['a', 'b', 'c', 'd'])
      })
    })

    describe('if minimum == maximum', () => {
      minimum = 'c'
      maximum = 'c'

      const rangerange = new Rangerange({ minimum, maximum })

      it('be equal minimum', () => {
        expect(rangerange.toArray()).toStrictEqual(['c'])
      })
    })

    describe('if minimum > maximum', () => {
      minimum = 'f'
      maximum = 'a'

      const rangerange = new Rangerange({ minimum, maximum })

      it('be blank array', () => {
        expect(rangerange.toArray()).toStrictEqual([])
      })
    })
  })
})
