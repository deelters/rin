---
date: 1648397724000
title: 'TC-7: Readonly'
scope: ['Typescript']
buckets: ['wrap', 'type_challenge']
---

Refer: [Easy - Readonly](https://github.com/type-challenges/type-challenges/blob/master/questions/7-easy-readonly/README.md)

Relation: [Medium - Readonly-2](/wrap/tc/8_readonly_2)

### Describe

Implement the built-in `Readonly<T>` generic without using it.

Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

For example

```javascript
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

### Test Cases

```typescript
import { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
```

### Solution

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```
