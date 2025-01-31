---
date: 1649942694484
title: 'TypeScript中的条件分布类型为什么要这么设计？'
scope: ['TS']
buckets: ['post', 'learning']
---

**条件分布类型（Distributive conditional types）**。既然是分布，那肯定离不开三元表达式。文档 [^Distributive conditional types]中这样解释：

> 选中类型为裸类型参数的条件类型称为分布条件类型。在实例化期间，分布式条件类型会自动分布在联合类型上。例如，`T extends U ? X : Y`在类型参数为`A | B | C`时解析为`(A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)`。

例如：

```typescript
type MyType<T> = T extends true ? string : number

// 相当于 (true extends true? string : number) | (false extends true ? string : number)
type newType = MyType<true | false> // string | number
```

既然`T`在类型中被视为一个整体，为什么不是下面这种情况呢？

```typescript
type newType = true | false extends true ? string : number // number
```

这就要区分裸类型（naked type）和包装类型（wrapped type）[^ naked and wrapped]:

```typescript
type NakedUsage<T> = T extends boolean ? 'YES' : 'NO'
type WrappedUsage<T> = [T] extends [boolean] ? 'YES' : 'NO' // wrapped in a tuple
```

如果`T`为联合类型（union）且属于裸类型，则会产生上述的类型分配。因此，想要避免分配可以将`T`包装为一个 tuple。

关于为什么这样设计，在文档中有提到过，这种方式可以方便的[过滤联合类型](/wrap/tc/43_exclude)，同时与`mapped types`结合可以[方便处理每个属性](/wrap/tc/11_tuple_to_object)。假设没有分配操作，那么对于一个联合类型来说，conditional types 要满足 true 的话就只能与自身 extends。conditional types 的出现可能单纯是为了更方便处理联合类型中的每个成员。

[^Distributive conditional types]: [Distributive conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types)

[^ naked and wrapped]: [Typescript: what is a "naked type parameter"](https://stackoverflow.com/questions/51651499/typescript-what-is-a-naked-type-parameter)
