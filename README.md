# rangerange
[practice]npm package for range object ~~(ruby like)~~

# Useage

## Rangerange#toArray()

```typescript
const rangerange = new Rangerange({minimum: 4, maximum: 8})
rangerange.toArray() // <= [4,5,6,7,8]

const rangerange = new Rangerange({minimum: 'a', maximum: 'd'})
rangerange.toArray() // <= ['a','b','c','d']
```

## Rangerange#isCover(other)

```typescript
const rangerange = new Rangerange({minimum: 4, maximum: 8})
rangerange.isCover(3) // <= false
rangerange.isCover(4) // <= true
rangerange.isCover(8) // <= true
rangerange.isCover(9) // <= false


const rangerange = new Rangerange({minimum: 4, maximum: 8})
const other = new Rangerange({minimum: 3, maximum: 5})
rangerange.isCover(other) // <= true

const rangerange = new Rangerange({minimum: 4, maximum: 8})
const other = new Rangerange({minimum: 2, maximum: 9})
rangerange.isCover(other) // <= false
```
