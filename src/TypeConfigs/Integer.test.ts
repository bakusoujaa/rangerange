import Rangerange from '../'

describe('Integer', () => {
  let minimum = null
  let maximum = null

  describe('toArray()', () => {
    describe('if minimum < to', () => {
      minimum = 3
      maximum = 6

      const rangerange = new Rangerange({ minimum, maximum })

      it('be incremented array', () => {
        expect(rangerange.toArray()).toStrictEqual([3, 4, 5, 6])
      })
    })

    describe('if minimum == to', () => {
      minimum = 3
      maximum = 3

      const rangerange = new Rangerange({ minimum, maximum })

      it('be equal minimum', () => {
        expect(rangerange.toArray()).toStrictEqual([3])
      })
    })

    describe('if minimum > maximum', () => {
      minimum = 7
      maximum = 2

      const rangerange = new Rangerange({ minimum, maximum })

      it('be blank array', () => {
        expect(rangerange.toArray()).toStrictEqual([])
      })
    })
  })

  describe('isCover()', () => {
    let self: Rangerange<number>
    let selfMin: number | undefined
    let selfMax: number | undefined

    describe('method attr is Rangerange object', () => {
      let other: Rangerange<number>
      let otherMin: number | undefined
      let otherMax: number | undefined

      beforeEach(() => {
        otherMin = 10
        otherMax = 100
      })

      describe('self has min and max', () => {
        beforeEach(() => {
          selfMin = 10
          selfMax = 100
        })

        describe('other has min and max', () => {
          describe('self.min <= other.min && other.max <= self.max', () => {
            beforeEach(() => {
              otherMin = 10
              otherMax = 100
              self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
              other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
            })
            it('should be true', () => {
              expect(self.isCover(other)).toBe(true)
            })
          })

          describe('other.min <= self.min && other.max <= self.max', () => {
            beforeEach(() => {
              otherMin = 9
              otherMax = 100
              self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
              other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
            })
            it('should be false', () => {
              expect(self.isCover(other)).toBe(false)
            })
          })

          describe('self.min <= other.min && self.max <= other.max', () => {
            beforeEach(() => {
              otherMin = 10
              otherMax = 101
              self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
              other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
            })
            it('should be false', () => {
              expect(self.isCover(other)).toBe(false)
            })
          })
        })

        describe('other has not min', () => {
          beforeEach(() => {
            otherMin = undefined
            otherMax = 100
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })

        describe('other has not max', () => {
          beforeEach(() => {
            otherMin = 10
            otherMax = undefined
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })
      })

      describe('self has only min', () => {
        beforeEach(() => {
          selfMin = 10
          selfMax = undefined
        })

        describe('other has not min', () => {
          beforeEach(() => {
            otherMin = undefined
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })

        describe('self > other', () => {
          beforeEach(() => {
            selfMin = 10
            otherMin = 9
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })

        describe('self == other', () => {
          beforeEach(() => {
            selfMin = 10
            otherMin = 10
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('self < other', () => {
          beforeEach(() => {
            selfMin = 10
            otherMin = 11
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })
      })

      describe('self has only max', () => {
        beforeEach(() => {
          selfMin = undefined
          selfMax = 100
        })

        describe('other has not max', () => {
          beforeEach(() => {
            otherMax = undefined
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })

        describe('self > other', () => {
          beforeEach(() => {
            selfMax = 10
            otherMax = 9
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('self == other', () => {
          beforeEach(() => {
            selfMax = 10
            otherMax = 10
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('self < other', () => {
          beforeEach(() => {
            selfMax = 10
            otherMax = 11
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            other = new Rangerange<number>({ minimum: otherMin, maximum: otherMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })
      })
    })

    describe('method attr is T object', () => {
      let other: number
      describe('self has min and max', () => {
        beforeEach(() => {
          selfMin = 10
          selfMax = 100
        })

        describe('other < min', () => {
          beforeEach(() => {
            other = 9
            selfMin = 10
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })

        describe('other == min', () => {
          beforeEach(() => {
            other = 10
            selfMin = 10
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('other > min', () => {
          beforeEach(() => {
            other = 11
            selfMin = 10
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
            console.dir(self)
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('other < max', () => {
          beforeEach(() => {
            other = 99
            selfMax = 100
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('other == max', () => {
          beforeEach(() => {
            other = 100
            selfMax = 100
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
          })
          it('should be true', () => {
            expect(self.isCover(other)).toBe(true)
          })
        })

        describe('other > max', () => {
          beforeEach(() => {
            other = 101
            selfMax = 100
            self = new Rangerange<number>({ minimum: selfMin, maximum: selfMax })
          })
          it('should be false', () => {
            expect(self.isCover(other)).toBe(false)
          })
        })
      })

    })
  })
})
