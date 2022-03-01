prototype-utils
===================
Some utils function about prototype manipulation, mix two class prototypes, create function in which `this` points to itself, and so on.

This package is developed mainly for personal usage. Use as your own risk.

## API
`export function insertPrototype<T>(obj: any, newProto: T): T`
Make `obj`'s prototype points to `newProto`, and connect the end of the protochain of `newProto` to the start of the protochain of the origin prototype of `obj`.
return the `obj`.

`export function extendPrototype<T>(obj: any, objWithNewProto: T)`
Similar to `insertPrototype`, but:
- `objWithNewProto` should be a object whose prototype is `newProto`, rather than pass the prototype directly.
- Properties on `objWithNewProto` will be copied to `obj`, by using `Object.assign(obj, objWithNewProto)`

`export function getParamsString(count: number): string`
Create a string as `p0,p1,p2,...,p_count`

`export function bindSelf<T extends Function>(fn: T): T`
Create a function whose `this` is bind to itself.
Typically `a.f.bind(a)` return a new function with `this` points to the `a` object, rather than the new function.
With this method, you can create a function which will execute `fn` with `this` pointing to the new function itself.
Example:
```js
const {bindSelf} = require("@starrah/prototype-utils")
function example() {
    return this
}
// use `bind` function
const a = example.bind(example)
const thisInA = a()
console.log(thisInA === a) // false
// use `bindSelf`
const b = bindSelf(example)
const thisInB = b()
console.log(thisInB === b) // true
```
